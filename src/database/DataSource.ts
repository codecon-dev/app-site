import { Sequelize } from "sequelize"

const dataSource: Sequelize = new Sequelize(
    process.env.DATABASE_NAME as string,
    process.env.DATABASE_USER as string,
    process.env.DATABASE_PASS as string,
    {
        host: process.env.DATABASE_HOST as string,
        dialect: "mysql",
        define: {
            freezeTableName: true,
            timestamps: true,
            underscored: true
        }
    }
)

export default dataSource