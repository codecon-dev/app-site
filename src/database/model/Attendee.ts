import { DataTypes, Op } from 'sequelize';
import dataSource from '../DataSource';
import ModelImpl, { commonAttributes } from './ModelImpl';

export type Event = 'DIGITAL' | 'SUMMIT' | 'FEATURE';

class Attendee extends ModelImpl<Attendee> {
    declare uuid: string;
    declare name: string;
    declare lastName: string;
    declare displayName?: string;
    declare email: string;
    declare githubFullName?: string;
    declare githubUsername?: string;
    declare even3Id?: string;
    declare mobilePhone?: string;
    declare acceptedTerms?: boolean;
    declare event: 'DIGITAL' | 'SUMMIT' | 'FEATURE';

    public static async findByEmail(email: string): Promise<Attendee | null> {
        return await Attendee.findOne({ where: { email } });
    }

    public static async findByUuid(uuid: string): Promise<Attendee | null> {
        return await Attendee.findOne({ where: { uuid } });
    }

    public static async findBySymplaIdAndEmail(
        even3Id: string,
        email: string
    ): Promise<Attendee | null> {
        return await Attendee.findOne({ where: { even3Id, email } });
    }

    public static async findBySymplaIdAndEvent(
        even3Id: string,
        event: Event
    ): Promise<Attendee | null> {
        return await Attendee.findOne({ where: { even3Id, event } });
    }

    public static async findByEmaildAndEvent(
        email: string,
        event: Event
    ): Promise<Attendee | null> {
        return await Attendee.findOne({ where: { email, event } });
    }

    public static async findBygithubUsernameAndEvent(
        username: string,
        event: Event
    ): Promise<Attendee | null> {
        return await Attendee.findOne({ where: { githubUsername: username, event } });
    }

    public static async findAllWithgithubUsernameAndEvent(
        event: Event
    ): Promise<Attendee[] | null> {
        return await Attendee.findAll({ where: { githubUsername: { [Op.ne]: '' }, event } });
    }

    public static async findByMobilePhone(mobilePhone: string): Promise<Attendee | null> {
        return await Attendee.findOne({ where: { mobilePhone: mobilePhone } });
    }
}

Attendee.init(
    {
        ...commonAttributes,
        uuid: {
            type: DataTypes.UUID,
            allowNull: false,
            defaultValue: DataTypes.UUIDV4,
            unique: true
        },
        name: { type: DataTypes.STRING, allowNull: false },
        lastName: { type: DataTypes.STRING, allowNull: true },
        displayName: { type: DataTypes.STRING, allowNull: true },
        email: { type: DataTypes.STRING, allowNull: false },
        githubFullName: { type: DataTypes.STRING, allowNull: true },
        githubUsername: { type: DataTypes.STRING, allowNull: true },
        even3Id: { type: DataTypes.STRING, allowNull: true },
        event: { type: DataTypes.ENUM('DIGITAL', 'SUMMIT', 'FEATURE'), allowNull: true },
        mobilePhone: { type: DataTypes.STRING, allowNull: true },
        acceptedTerms: { type: DataTypes.BOOLEAN, defaultValue: false, allowNull: true }
    },
    {
        sequelize: dataSource
    }
);

export default Attendee;
