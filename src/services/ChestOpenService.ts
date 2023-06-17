import Prize, { PrizeType } from '@models/Prize';
import User from '@models/User';
import Chest from '@models/chest/Chest';
import ChestOpen from '@models/chest/ChestOpen';
import { Sequelize, Transaction } from 'sequelize';
import { PrizeService } from './PrizeService';

export type ChestInfo = {
    chest: ChestOpen;
    firstOpen: boolean;
};

export default class ChestOpenService {
    public static async openChest(
        chest: Chest,
        user: User,
        transaction: Transaction
    ): Promise<ChestInfo | undefined> {
        if (!chest || !user) throw new Error('Dados inválidos para abrir o baú');

        const chestOpen = await ChestOpen.findOne({
            where: {
                userId: user.id,
                chestId: chest.id
            }
        });
        if (chestOpen) {
            console.warn(`Usuário ${user.id} tentou abrir baú ${chest.id} pela segunda vez`);
            return { chest: chestOpen, firstOpen: false };
        }

        const prizeType = await PrizeService.getRandomPrizeType();
        const prize: Prize | null = await this.selectPrize(prizeType, chest);

        return await this.save(chest, user, prize, transaction);
    }

    private static async save(
        chest: Chest,
        user: User,
        prize: Prize | null,
        transaction: Transaction
    ): Promise<ChestInfo> {
        const chestOpen = await ChestOpen.create(
            {
                chestId: chest.id,
                prizeId: prize?.id,
                userId: user.id
            },
            { transaction: transaction }
        );

        await chestOpen.save();

        if (prize) await PrizeService.consumePrize(prize, transaction);

        return { chest: chestOpen, firstOpen: true };
    }

    private static async selectPrize(
        prizeType: PrizeType | null,
        chest: Chest
    ): Promise<Prize | null> {
        switch (prizeType) {
            case PrizeType.RARE:
                const prize = await PrizeService.getValidPrize(
                    prizeType,
                    Sequelize.literal('rand()')
                );
                if (!prize)
                    throw new Error(
                        `Usuário deveria ter ganho um prêmio do tipo ${prizeType} mas não ganhou nada`
                    );
                return prize;

            case PrizeType.CODE_CODES:
                return await chest.getPrize();

            default:
                return null;
        }
    }
}
