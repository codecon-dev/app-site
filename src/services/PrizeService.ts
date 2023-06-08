import Prize, { PrizeType } from '@models/Prize';
import { Order, Sequelize } from 'sequelize';

export class PrizeService {
    public static async chooseRandomPrize(): Promise<Prize | null> {
        const stillHaveRarePrizes = !!(await this.getValidPrize(PrizeType.RARE));

        const prizeType = this.rollDice(stillHaveRarePrizes);
        if (!prizeType) return null;
    }

    private static async getValidPrize(prizeType: PrizeType, order?: Order): Promise<Prize | null> {
        return await Prize.findOne({
            where: {
                redeemed: false,
                type: prizeType
            },
            order: order
        });
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
