import ResourceNotFoundError from '@lib/errors/ResourceNotFoundError';
import Puzzle from 'src/database/model/puzzle/Puzzle';
import PuzzleAnswer, { PuzzleAnswerStatus } from 'src/database/model/puzzle/PuzzleAnswer';
import User from 'src/database/model/User';
import CodeCodesService from './CodeCodesService';

export type PuzzleAnswerAttemptResponse = {
    success: boolean;
    message: string;
};

export default class PuzzleAnswerService {
    public static async attempt(
        user: User,
        userGuess: string,
        puzzlePublicId: string
    ): Promise<PuzzleAnswerAttemptResponse> {
        const puzzle: Puzzle | null = await Puzzle.findByPublicId(puzzlePublicId);
        if (!puzzle) throw new ResourceNotFoundError('Enigma não encontrado');

        const answeredAlready = !!(await PuzzleAnswer.findOne({
            where: { userId: user.id, puzzleId: puzzle.id, status: PuzzleAnswerStatus.DONE }
        }));
        if (answeredAlready)
            return {
                success: true,
                message: 'O enigma já foi respondido e os pontos já foram creditados :)'
            };

        const puzzleAnswer: PuzzleAnswer = await this.findOrCreate(user, puzzle);
        puzzleAnswer.attempts++;

        const normalizedUserGuess: string = this.normalize(userGuess);
        const guessedCorrectly: boolean = normalizedUserGuess == this.normalize(puzzle.answer);
        if (guessedCorrectly) {
            const { data } = await CodeCodesService.claimCode(user, puzzle.rewardCode);
            if (!data) throw new Error('Dados do Code-Codes vieram vazios');

            await this.setAsDone(puzzleAnswer);
            return {
                success: true,
                message: `Acertou, mizerávi! Você também ganhou ${data.scoreAcquired} pontos no Code-Codes.`
            };
        }

        const almostList: [] = JSON.parse(puzzle.almostList);

        if (almostList.length) {
            const almostGotItRight: boolean = almostList.some(
                (almost: string) => normalizedUserGuess == this.normalize(almost)
            );
            if (almostGotItRight) {
                puzzleAnswer.almosts++;
                await puzzleAnswer.save();
                return { success: false, message: `"${userGuess}" foi quase` };
            }
        }

        await puzzleAnswer.save();
        return { success: false, message: 'Hmmm, não é isso' };
    }

    private static async findOrCreate(user: User, puzzle: Puzzle): Promise<PuzzleAnswer> {
        const [puzzleAnswer, created] = await PuzzleAnswer.findOrCreate({
            where: { userId: user.id, puzzleId: puzzle.id }
        });

        if (!puzzleAnswer.status) puzzleAnswer.status = PuzzleAnswerStatus.PENDING;
        return await puzzleAnswer.save();
    }

    private static async setAsDone(puzzleAnswer: PuzzleAnswer): Promise<void> {
        puzzleAnswer.status = PuzzleAnswerStatus.DONE;
        puzzleAnswer.doneAt = new Date();
        await puzzleAnswer.save();
    }

    private static normalize(value: string): string {
        return value
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLowerCase()
            .trim();
    }
}
