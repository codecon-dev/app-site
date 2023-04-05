import { DataTypes } from 'sequelize';
import dataSource from '../DataSource';
import ModelImpl, { commonAttributes } from './ModelImpl';

class Attendee extends ModelImpl<Attendee> {
    declare name: string;
    declare lastName: string;
    declare email: string;
    declare githubFullName?: string;
    declare githubUsername?: string;
    declare symplaId?: string;

    public static async findByEmail(email: string): Promise<Attendee | null> {
        return await Attendee.findOne({ where: { email: email } });
    }

    public static async findBySymplaId(symplaId: string): Promise<Attendee | null> {
        return await Attendee.findOne({ where: { symplaId: symplaId } });
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
        symplaId: { type: DataTypes.STRING, allowNull: true }
    },
    {
        sequelize: dataSource,
        indexes: [{ unique: true, fields: ['email'] }]
    }
);

export default Attendee;
