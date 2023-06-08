import { DataTypes, ForeignKey } from 'sequelize';
import dataSource from '../DataSource';
import ModelImpl, { commonAttributes } from './ModelImpl';

export enum PrizeType {
    CODE_CODES = 'CODE_CODES',
    RARE = 'RARE'
}

class Prize extends ModelImpl<Prize> {
    declare type: PrizeType;
    declare redeemed: boolean;
    declare redeemedAt: Date;
    declare description: string;
}

Prize.init(
    {
        ...commonAttributes,
        type: { type: DataTypes.ENUM(...Object.keys(PrizeType)) },
        redeemed: { type: DataTypes.BOOLEAN },
        redeemedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
        description: { type: DataTypes.STRING }
    },
    {
        sequelize: dataSource
    }
);

export default Prize;
