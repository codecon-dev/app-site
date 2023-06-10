import User from '@models/User';
import Chest from '@models/chest/Chest';
import ChestOpen from '@models/chest/ChestOpen';
import { Sequelize, Transaction } from 'sequelize';
export default class ChestOpenService {
    public static async openChest(
        chest: Chest,
        user: User,
        transaction: Transaction
    ): Promise<ChestOpen | undefined> {
        if (!chest || !user) throw new Error('Dados inválidos para abrir o baú');

        const chestOpen = await ChestOpen.findOne({
            where: {
                userId: user.id,
                chestId: chest.id
            }
        });
        if (chestOpen) {
            console.warn(`Usuário ${user.id} tentou abrir baú ${chest.id} pela segunda vez`);
            return chestOpen;
        }

    }
}
