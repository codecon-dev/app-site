import { DataTypes, ForeignKey } from 'sequelize';
import dataSource from '../DataSource';
import ModelImpl, { commonAttributes } from './ModelImpl';
import User from './User';

export enum PrizeType {
    CODE_CODES = 'CODE_CODES',
    RARE = 'RARE'
}

class Prize extends ModelImpl<Prize> {
    declare type: PrizeType;
    declare redeemed: boolean;
    declare redeemedAt: Date;
    declare description: string;

    declare userId?: ForeignKey<User>;
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

Prize.belongsTo(User, { foreignKey: { allowNull: true }, as: 'user' });

export default Prize;
