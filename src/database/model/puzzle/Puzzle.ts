import { DataTypes } from 'sequelize';
import dataSource from 'src/database/DataSource';
import ModelImpl, { commonAttributes } from '../ModelImpl';

export enum PuzzleCompanyType {
    TOTVS = 'TOTVS',
    GLOBO = 'GLOBO',
    BLIP = 'BLIP'
}

class Puzzle extends ModelImpl<Puzzle> {
    declare almostList: string;
    declare answer: string;
    declare publicId: string;
    declare rewardCode: string;
    declare company?: PuzzleCompanyType;

    public static async findByPublicId(publicId: string): Promise<Puzzle | null> {
        return await Puzzle.findOne({ where: { publicId: publicId } });
    }
}

Puzzle.init(
    {
        ...commonAttributes,
        almostList: { type: DataTypes.STRING, allowNull: true },
        answer: { type: DataTypes.STRING, allowNull: false },
        publicId: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, allowNull: false },
        rewardCode: { type: DataTypes.STRING, allowNull: false },
        company: { type: DataTypes.ENUM(...Object.keys(PuzzleCompanyType)) }
    },
    {
        sequelize: dataSource,
        indexes: [{ unique: true, fields: ['public_id'] }]
    }
);

export default Puzzle;
