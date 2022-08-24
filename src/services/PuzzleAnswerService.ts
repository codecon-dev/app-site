import ResourceNotFoundError from '@lib/errors/ResourceNotFoundError';
import Puzzle from 'src/database/model/puzzle/Puzzle';
import PuzzleAnswer, { PuzzleAnswerType } from 'src/database/model/puzzle/PuzzleAnswer';
import User from 'src/database/model/User';

export type PuzzleAnswerAttemptResponse = {
  success: boolean;
  message: string;
  rewardCode?: string;
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
      where: { userId: user.id, puzzleId: puzzle.id, status: PuzzleAnswerType.DONE }
    }));
    if (answeredAlready) return { success: true, message: 'Você já respondeu esse enigma!' };

    const normalizedUserGuess: string = this.normalize(userGuess);
    const guessedCorrectly: boolean = normalizedUserGuess == this.normalize(puzzle.answer);
    if (guessedCorrectly) {
      await this.save(user, puzzle, PuzzleAnswerType.DONE);
      return {
        success: true,
        message: 'Acertou, mizerávi! Seus pontos do code-codes já foram computados automaticamente.'
      };
    }

    const almostGotItRight: boolean = puzzle.almostList.some(
      (almost: string) => normalizedUserGuess == this.normalize(almost)
    );
    if (almostGotItRight) {
      await this.save(user, puzzle, PuzzleAnswerType.PENDING);
      return { success: false, message: `"${userGuess}" foi quase` };
    }

    return { success: false, message: 'Hmmm, não é isso' };
  }

  private static async save(
    user: User,
    puzzle: Puzzle,
    status: PuzzleAnswerType = PuzzleAnswerType.PENDING
  ): Promise<void> {
    const [puzzleAnswer, created] = await PuzzleAnswer.findOrCreate({
      where: { userId: user.id, puzzleId: puzzle.id }
    });

    puzzleAnswer.status = status;
    puzzleAnswer.attempts++;
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
