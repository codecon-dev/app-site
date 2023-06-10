import ModelImpl, { commonAttributes } from '@models/ModelImpl';
import Prize from '@models/Prize';
import User from '@models/User';
import { BelongsToGetAssociationMixin, ForeignKey } from 'sequelize';
import dataSource from 'src/database/DataSource';
import Chest from './Chest';

class ChestOpen extends ModelImpl<ChestOpen> {
    declare chestId: ForeignKey<Chest['id']>;
    declare prizeId?: ForeignKey<Prize['id']>;
    declare userId: ForeignKey<User['id']>;

    declare getPrize: BelongsToGetAssociationMixin<Prize>;
}

ChestOpen.init({ ...commonAttributes }, { sequelize: dataSource });

ChestOpen.belongsTo(Chest, { foreignKey: { allowNull: false }, as: 'chest' });
ChestOpen.belongsTo(Prize, { foreignKey: { allowNull: true }, as: 'prize' });
ChestOpen.belongsTo(User, { foreignKey: { allowNull: false }, as: 'user' });

export default ChestOpen;
