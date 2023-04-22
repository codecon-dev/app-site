import { DataTypes, Op } from 'sequelize';
import dataSource from '../DataSource';
import ModelImpl, { commonAttributes } from './ModelImpl';

export type Event = 'DIGITAL' | 'SUMMIT' | 'FEATURE';

class Attendee extends ModelImpl<Attendee> {
    declare name: string;
    declare lastName: string;
    declare email: string;
    declare githubFullName?: string;
    declare githubUsername?: string;
    declare symplaId?: string;
    declare event?: 'DIGITAL' | 'SUMMIT' | 'FEATURE';

    public static async findByEmail(email: string): Promise<Attendee | null> {
        return await Attendee.findOne({ where: { email } });
    }

    public static async findBySymplaIdAndEmail(
        symplaId: string,
        email: string
    ): Promise<Attendee | null> {
        return await Attendee.findOne({ where: { symplaId, email } });
    }

    public static async findBySymplaIdAndEvent(
        symplaId: string,
        event: Event
    ): Promise<Attendee | null> {
        return await Attendee.findOne({ where: { symplaId, event } });
    }

    public static async findByEmaildAndEvent(
        email: string,
        event: Event
    ): Promise<Attendee | null> {
        return await Attendee.findOne({ where: { email, event } });
    }

    public static async findByGithubUsernameAndEvent(
        username: string,
        event: Event
    ): Promise<Attendee | null> {
        return await Attendee.findOne({ where: { githubUsername: username, event } });
    }

    public static async findAllWithGithubUsernameAndEvent(
        event: Event
    ): Promise<Attendee[] | null> {
        return await Attendee.findAll({ where: { githubUsername: { [Op.ne]: '' }, event } });
    }
}

Attendee.init(
    {
        ...commonAttributes,
        name: { type: DataTypes.STRING, allowNull: false },
        lastName: { type: DataTypes.STRING, allowNull: true },
        email: { type: DataTypes.STRING, allowNull: false },
        githubFullName: { type: DataTypes.STRING, allowNull: true },
        githubUsername: { type: DataTypes.STRING, allowNull: true },
        symplaId: { type: DataTypes.STRING, allowNull: true },
        event: { type: DataTypes.ENUM('DIGITAL', 'SUMMIT', 'FEATURE'), allowNull: true }
    },
    {
        sequelize: dataSource,
        indexes: [{ unique: true, fields: ['email'] }]
    }
);

export default Attendee;
