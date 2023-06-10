import Prize from '@models/Prize';
import { DataTypes, ForeignKey } from 'sequelize';
import dataSource from 'src/database/DataSource';
import ModelImpl, { commonAttributes } from '../ModelImpl';

class Chest extends ModelImpl<Chest> {
    declare location: string;
    declare publicId: string;
    
    declare prizeId: ForeignKey<Prize["id"]>;
}

Chest.init(
    {
        ...commonAttributes,
        location: { type: DataTypes.STRING, allowNull: false },
        publicId: { type: DataTypes.UUID, allowNull: false, defaultValue: DataTypes.UUIDV4 }
    },
    {
        sequelize: dataSource,
        indexes: [
            { unique: true, fields: ['public_id'] },
            { unique: true, fields: ['prize_id'] }
        ]
    }
);

Chest.belongsTo(Prize, { foreignKey: { allowNull: false }, as: 'prize' });

export default Chest;
