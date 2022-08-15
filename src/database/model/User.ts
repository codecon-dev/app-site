import { DataTypes } from "sequelize/types"
import dataSource from "../DataSource"
import ModelImpl, { commonAttributes } from "./ModelImpl"

class User extends ModelImpl<User> {
    
    declare name: string
    declare email: string
}

User.init({
    ...commonAttributes,
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true }
}, {sequelize: dataSource})

export default User