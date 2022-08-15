import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model, ModelAttributeColumnOptions } from "sequelize"

export const commonAttributes: {id: ModelAttributeColumnOptions, createdAt: DataTypes.DataType, updatedAt: DataTypes.DataType} = {
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
}

export default abstract class ModelImpl<Type extends Model> extends Model<InferAttributes<Type>, InferCreationAttributes<Type>> {
    declare id: CreationOptional<number>
    declare createdAt: CreationOptional<Date>
    declare updatedAt: CreationOptional<Date>
}