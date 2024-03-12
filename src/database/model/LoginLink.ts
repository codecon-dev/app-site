import { DataTypes } from 'sequelize';
import dataSource from '../DataSource';
import ModelImpl, { commonAttributes } from './ModelImpl';
import Attendee from './Attendee';

class LoginLink extends ModelImpl<LoginLink> {
    declare hash: string;
    declare expiresAt: Date;
    declare attendeeUuid: string;

    public static async findByHash(hash: string): Promise<LoginLink | null> {
        return await LoginLink.findOne({ where: { hash: hash } });
    }
}

LoginLink.init(
    {
        ...commonAttributes,
        hash: { type: DataTypes.STRING, allowNull: false },
        expiresAt: { type: DataTypes.DATE, allowNull: false },
        attendeeUuid: { type: DataTypes.UUID, allowNull: false }
    },
    {
        sequelize: dataSource
    }
);

LoginLink.belongsTo(Attendee, { foreignKey: 'attendeeUuid', targetKey: 'uuid' });

export default LoginLink;
