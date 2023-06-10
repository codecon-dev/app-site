import Prize, { PrizeType } from '@models/Prize';
import { Op, Order, Transaction } from 'sequelize';

export class PrizeService {
    public static async getRandomPrizeType(): Promise<PrizeType | null> {
        const stillHaveRarePrizes = !!(await this.getValidPrize(PrizeType.RARE));
        return this.rollDice(stillHaveRarePrizes);
    }

    public static async getValidPrize(prizeType: PrizeType, order?: Order): Promise<Prize | null> {
        return await Prize.findOne({
            where: {
                type: prizeType,
                [Op.or]: [{ remaining: { [Op.gt]: 0 } }, { remaining: { [Op.is]: null } }]
            },
            order: order
        });
    }

    public static async consumePrize(prize: Prize, transaction: Transaction): Promise<void> {
        if (!prize.remaining) return;

        prize.remaining--;
        await prize.save({ transaction: transaction });
    }

    private static rollDice(canGainRare: boolean): PrizeType | null {
        const dice = parseFloat(Math.random().toFixed(2));

        const chancesOfGainingRare = 5 / 100;
        const mustGainRare = canGainRare && chancesOfGainingRare >= dice;
        if (mustGainRare) return PrizeType.RARE;

        let chancesOfGainingCodeCodes = 60 / 100;
        if (canGainRare) chancesOfGainingCodeCodes += chancesOfGainingRare;

        const mustGainCodeCodes = chancesOfGainingCodeCodes >= dice;
        if (mustGainCodeCodes) return PrizeType.CODE_CODES;

        return null;
    }
}
