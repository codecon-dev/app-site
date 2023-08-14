import { DataTypes } from 'sequelize';
import dataSource from '../DataSource';
import ModelImpl, { commonAttributes } from './ModelImpl';

class User extends ModelImpl<User> {
    declare name: string;
    declare displayName?: string;
    declare email: string;
    declare mobilePhone?: string;
    declare acceptedTerms: boolean;

    public static async findByEmail(email: string): Promise<User | null> {
        return await User.findOne({ where: { email: email } });
    }

    public static async findByMobilePhone(mobilePhone: string): Promise<User | null> {
        return await User.findOne({ where: { mobilePhone: mobilePhone } });
    }
}

User.init(
    {
        ...commonAttributes,
        name: { type: DataTypes.STRING, allowNull: false },
        displayName: { type: DataTypes.STRING, allowNull: true },
        email: { type: DataTypes.STRING, allowNull: false },
        mobilePhone: { type: DataTypes.STRING, allowNull: true },
        acceptedTerms: { type: DataTypes.BOOLEAN, defaultValue: false }
    },
    {
        sequelize: dataSource,
        indexes: [
            { unique: true, fields: ['email'] }
        ]
    }
);

export default User;
