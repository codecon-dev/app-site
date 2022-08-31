import { NextApiRequest, NextApiResponse } from 'next';
import dataSource from 'src/database/DataSource';
import Puzzle from 'src/database/model/puzzle/Puzzle';
import PuzzleAnswer from 'src/database/model/puzzle/PuzzleAnswer';
import User from 'src/database/model/User';

export default async function SyncDatabaseController(req: NextApiRequest, res: NextApiResponse) {
    console.log(Puzzle, User, PuzzleAnswer);
    await dataSource.sync({ alter: true });

    res.status(200).json('OK');
}
