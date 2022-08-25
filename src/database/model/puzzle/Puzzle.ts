import { DataTypes } from "sequelize"
import dataSource from "src/database/DataSource"
import ModelImpl, { commonAttributes } from "../ModelImpl"

class Puzzle extends ModelImpl<Puzzle> {
    
    declare almostList: Array<string>
    declare answer: string
    declare publicId: string
    declare rewardCode: string

    public static async findByPublicId(publicId: string): Promise<Puzzle | null> {
        return await Puzzle.findOne({ where: { publicId: publicId } })
    }
}

Puzzle.init({
    ...commonAttributes,
    almostList: { type: DataTypes.JSON, allowNull: true },
    answer: { type: DataTypes.STRING, allowNull: false },
    publicId: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, allowNull: false },
    rewardCode: { type: DataTypes.STRING, allowNull: false }
}, {
    sequelize: dataSource,
    indexes: [ 
        { unique: true, fields: ["public_id"] },
        { unique: true, fields: ["reward_code"] }
    ]
})

export default Puzzle