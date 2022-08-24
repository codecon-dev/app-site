import EscapeRoom from 'src/database/model/EscapeRoom';
import User from 'src/database/model/User';
import CodeCodesService from './CodeCodesService';

export type EscapeRoomResponse = {
    success: boolean;
    message: string;
};

export default class EscapeRoomService {
    public static async finish(user: User, message: string): Promise<EscapeRoomResponse> {
        const [escapeRoom, created] = await EscapeRoom.findOrCreate({
            where: { userId: user.id }
        });

        escapeRoom.message = message;
        await escapeRoom.save();

        const { data } = await CodeCodesService.claimCode(user, '');
        if (!data) throw new Error('Dados do Code-Codes vieram vazios');

        return {
            success: true,
            message: `Parabéns por ter chegado aqui! Você também ganhou ${data.scoreAcquired} pontos no Code-Codes.`
        };
    }
}
