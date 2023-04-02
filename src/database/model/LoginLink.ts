import { DataTypes } from 'sequelize';
import dataSource from '../DataSource';
import ModelImpl, { commonAttributes } from './ModelImpl';
import Attendee from './Attendee';

class LoginLink extends ModelImpl<LoginLink> {
    declare hash: string;
    declare expiresAt: Date;
    declare attendeeId?: number;

    public static async findByHash(hash: string): Promise<LoginLink | null> {
        return await LoginLink.findOne({ where: { hash: hash } });
    }
}

LoginLink.init(
    {
        ...commonAttributes,
        hash: { type: DataTypes.STRING, allowNull: false },
        expiresAt: { type: DataTypes.DATE, allowNull: false }
    },
    {
        sequelize: dataSource
    }
);

LoginLink.belongsTo(Attendee, { foreignKey: 'attendeeId', targetKey: 'id' });

export default LoginLink;
