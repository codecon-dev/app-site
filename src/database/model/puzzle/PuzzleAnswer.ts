import { DataTypes } from "sequelize"
import dataSource from "src/database/DataSource"
import ModelImpl, { commonAttributes } from "../ModelImpl"
import User from "../User"
import Puzzle from "./Puzzle"

export enum PuzzleAnswerType {
    PENDING = "PENDING",
    DONE = "DONE"
}

class PuzzleAnswer extends ModelImpl<PuzzleAnswer> {
    
    declare attempts: number
    declare status: PuzzleAnswerType
    declare puzzleId?: number
    declare userId?: number
}

PuzzleAnswer.init({
    ...commonAttributes,
    attempts: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false, defaultValue: 0 },
    status: { type: DataTypes.ENUM(...Object.keys(PuzzleAnswerType)) }
}, {sequelize: dataSource})

PuzzleAnswer.belongsTo(Puzzle, { foreignKey: "puzzleId", targetKey: "id" })
PuzzleAnswer.belongsTo(User, { foreignKey: "userId", targetKey: "id" })

export default PuzzleAnswer
