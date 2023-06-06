import { DataTypes } from 'sequelize';
import dataSource from 'src/database/DataSource';
import ModelImpl, { commonAttributes } from '../ModelImpl';
import User from '../User';
import Puzzle, { PuzzleCompanyType } from './Puzzle';

export enum PuzzleAnswerStatus {
    PENDING = 'PENDING',
    DONE = 'DONE'
}

class PuzzleAnswer extends ModelImpl<PuzzleAnswer> {
    [key: string]: any;
    declare attempts: number;
    declare almosts: number;
    declare status: PuzzleAnswerStatus;
    declare doneAt: Date;
    declare puzzleId?: number;
    declare company?: PuzzleCompanyType;
    declare userId?: number;
}

PuzzleAnswer.init(
    {
        ...commonAttributes,
        attempts: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false, defaultValue: 0 },
        almosts: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false, defaultValue: 0 },
        status: { type: DataTypes.ENUM(...Object.keys(PuzzleAnswerStatus)) },
        doneAt: { type: DataTypes.DATE, allowNull: true, defaultValue: null },
        company: { type: DataTypes.ENUM(...Object.keys(PuzzleCompanyType)) }
    },
    { sequelize: dataSource }
);

PuzzleAnswer.belongsTo(Puzzle, { foreignKey: 'puzzleId', targetKey: 'id' });
PuzzleAnswer.belongsTo(User, { foreignKey: 'userId', targetKey: 'id' });

export default PuzzleAnswer;
