import ModelImpl, { commonAttributes } from '@models/ModelImpl';
import Prize from '@models/Prize';
import Attendee from '@models/Attendee';
import { BelongsToGetAssociationMixin, ForeignKey } from 'sequelize';
import dataSource from 'src/database/DataSource';
import Chest from './Chest';

class ChestOpen extends ModelImpl<ChestOpen> {
    declare chestId: ForeignKey<Chest['id']>;
    declare prizeId?: ForeignKey<Prize['id']>;
    declare attendeeUuid: ForeignKey<Attendee['uuid']>;

    declare getPrize: BelongsToGetAssociationMixin<Prize>;
}

ChestOpen.init(
    { ...commonAttributes },
    {
        sequelize: dataSource,
        indexes: [{ unique: true, fields: ['chest_id', 'attendee_id'] }]
    }
);

ChestOpen.belongsTo(Chest, { foreignKey: { allowNull: false }, as: 'chest' });
ChestOpen.belongsTo(Prize, { foreignKey: { allowNull: true }, as: 'prize' });
ChestOpen.belongsTo(Attendee, { foreignKey: { allowNull: false }, as: 'attendee' });

export default ChestOpen;
