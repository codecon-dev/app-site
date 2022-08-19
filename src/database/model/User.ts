import { DataTypes } from "sequelize"
import dataSource from "../DataSource"
import ModelImpl, { commonAttributes } from "./ModelImpl"

class User extends ModelImpl<User> {
    
    declare name: string
    declare email: string

    public static async findByEmail(email: string): Promise<User | null> {
        return await User.findOne({ where: { email: email } })
    }
}

User.init({
    ...commonAttributes,
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true }
}, {sequelize: dataSource})

export default User