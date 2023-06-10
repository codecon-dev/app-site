import { Sequelize, Transaction } from 'sequelize';
import mysql2 from 'mysql2';

const dataSource: Sequelize = new Sequelize(
  process.env.DATABASE_NAME as string,
  process.env.DATABASE_USER as string,
  process.env.DATABASE_PASS as string,
  {
    host: process.env.DATABASE_HOST as string,
    dialect: 'mysql',
    dialectModule: mysql2,
    define: {
      freezeTableName: true,
      timestamps: true,
      underscored: true
    }
  }
);

export default dataSource;

export async function withTransaction<T>(callable: (transaction: Transaction) => Promise<T>): Promise<T | undefined> {
    const transaction = await dataSource.transaction()

    try {
        const result = await callable(transaction) as T
        await transaction.commit()
        return result
    } catch (error) {
        console.error("Ocorreu um erro inesperado", error)
        await transaction.rollback()
    }
}
