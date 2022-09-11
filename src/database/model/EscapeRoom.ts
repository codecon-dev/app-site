import { DataTypes } from 'sequelize';
import dataSource from 'src/database/DataSource';
import ModelImpl, { commonAttributes } from './ModelImpl';
import User from './User';

class EscapeRoom extends ModelImpl<EscapeRoom> {
    declare message: string;
    declare userId?: number;
}

EscapeRoom.init(
    {
        ...commonAttributes,
        message: { type: DataTypes.STRING, allowNull: true }
    },
    {
        sequelize: dataSource
    }
);

EscapeRoom.belongsTo(User, { foreignKey: 'userId', targetKey: 'id' });

export default EscapeRoom;
