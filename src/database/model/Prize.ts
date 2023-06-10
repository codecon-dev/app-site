import { DataTypes } from 'sequelize';
import dataSource from '../DataSource';
import ModelImpl, { commonAttributes } from './ModelImpl';

export enum PrizeType {
    CODE_CODES = 'CODE_CODES',
    RARE = 'RARE'
}

class Prize extends ModelImpl<Prize> {
    declare type: PrizeType;
    declare remaining: number | null;
    declare description: string;
}

Prize.init(
    {
        ...commonAttributes,
        type: { type: DataTypes.ENUM(...Object.keys(PrizeType)) },
        remaining: { type: DataTypes.INTEGER, allowNull: true },
        description: { type: DataTypes.STRING }
    },
    {
        sequelize: dataSource
    }
);

export default Prize;
