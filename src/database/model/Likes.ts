import { DataTypes } from 'sequelize';
import dataSource from '../DataSource';
import ModelImpl, { commonAttributes } from './ModelImpl';
import Attendee from './Attendee';

class Likes extends ModelImpl<Likes> {
    declare talkId: string;
    declare attendeeUuid: string;

    public static async findByTalkAndAttendee(
        talkId: string,
        attendeeUuid: string
    ): Promise<Likes | null> {
        return await Likes.findOne({ where: { talkId, attendeeUuid } });
    }
}

Likes.init(
    {
        ...commonAttributes,
        talkId: { type: DataTypes.STRING, allowNull: false },
        attendeeUuid: { type: DataTypes.UUID, allowNull: false }
    },
    {
        sequelize: dataSource
    }
);

Likes.belongsTo(Attendee, { foreignKey: 'attendeeUuid', targetKey: 'uuid' });

export default Likes;
