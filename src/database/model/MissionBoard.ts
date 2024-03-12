import { DataTypes } from 'sequelize';
import dataSource from 'src/database/DataSource';
import ModelImpl, { commonAttributes } from './ModelImpl';
import { ForeignKey } from 'sequelize';
import Attendee from './Attendee';

class MissionBoard extends ModelImpl<MissionBoard> {
    declare attendeeUuid: ForeignKey<Attendee['uuid']>;
}

MissionBoard.init(
    {
        ...commonAttributes,
        attendeeUuid: { type: DataTypes.UUID, allowNull: false }
    },
    {
        sequelize: dataSource
    }
);

MissionBoard.belongsTo(Attendee, { foreignKey: { allowNull: false }, as: 'attendee' });

export default MissionBoard;
