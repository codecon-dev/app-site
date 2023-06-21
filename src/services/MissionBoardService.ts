import MissionBoard from 'src/database/model/MissionBoard';
import User from 'src/database/model/User';
import CodeCodesService from './CodeCodesService';

export type MissionBoardResponse = {
    success: boolean;
    message: string;
};

export type Guess = {
    stamp1: string;
    stamp2: string;
    stamp3: string;
    stamp4: string;
    stamp5: string;
    stamp6: string;
    stamp7: string;
    stamp8: string;
    stamp9: string;
};

export default class MissionBoardService {
    public static async finish(user: User, guess: Guess): Promise<MissionBoardResponse> {
        if (
            guess.stamp1.toUpperCase() !== process.env.TREASURE_HUNT_WORD_1 ||
            guess.stamp2.toUpperCase() !== process.env.TREASURE_HUNT_WORD_2 ||
            guess.stamp3.toUpperCase() !== process.env.TREASURE_HUNT_WORD_3 ||
            guess.stamp4.toUpperCase() !== process.env.TREASURE_HUNT_WORD_4 ||
            guess.stamp5.toUpperCase() !== process.env.TREASURE_HUNT_WORD_5 ||
            guess.stamp6.toUpperCase() !== process.env.TREASURE_HUNT_WORD_6 ||
            guess.stamp7.toUpperCase() !== process.env.TREASURE_HUNT_WORD_7 ||
            guess.stamp8.toUpperCase() !== process.env.TREASURE_HUNT_WORD_8 ||
            guess.stamp9.toUpperCase() !== process.env.TREASURE_HUNT_WORD_9
        ) {
            return {
                success: false,
                message: `Parece que algum dos selos falhou.`
            };
        }

        const [missionBoard, created] = await MissionBoard.findOrCreate({
            where: { userId: user.id }
        });

        if (missionBoard.id) {
            return {
                success: true,
                message: `Você já enviou todos os selos e já está concorrendo!`
            };
        }

        await missionBoard.save();

        const { data } = await CodeCodesService.claimCode(
            user,
            `${process.env.CODECODES_TREASURE_HUNT}`
        );
        if (!data) throw new Error('Dados do Code-Codes vieram vazios');

        return {
            success: true,
            message: `Boa, você conseguiu! Você também ganhou ${data.scoreAcquired} pontos no Code-Codes.`
        };
    }
}