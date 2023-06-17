import { DataTypes } from 'sequelize';
import dataSource from 'src/database/DataSource';
import ModelImpl, { commonAttributes } from './ModelImpl';
import User from './User';

class MissionBoard extends ModelImpl<MissionBoard> {
    declare userId?: number;
}

MissionBoard.init(
    {
        ...commonAttributes
    },
    {
        sequelize: dataSource
    }
);

MissionBoard.belongsTo(User, { foreignKey: 'userId', targetKey: 'id' });

export default MissionBoard;
