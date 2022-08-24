import { NextApiRequest, NextApiResponse } from "next"
import dataSource from "src/database/DataSource"

export default async function SyncDatabaseController(req: NextApiRequest, res: NextApiResponse) {
    await dataSource.sync({ alter: true })

    res.status(200).json("OK")
}
