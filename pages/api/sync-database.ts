import { NextApiRequest, NextApiResponse } from 'next';
import dataSource from 'src/database/DataSource';
import EscapeRoom from 'src/database/model/EscapeRoom';
import Puzzle from 'src/database/model/puzzle/Puzzle';
import PuzzleAnswer from 'src/database/model/puzzle/PuzzleAnswer';
import User from 'src/database/model/User';
import Attendee from 'src/database/model/Attendee';
import LoginLink from 'src/database/model/LoginLink';

export default async function SyncDatabaseController(req: NextApiRequest, res: NextApiResponse) {
    console.log(Puzzle, User, PuzzleAnswer, EscapeRoom, Attendee, LoginLink);
    await dataSource.sync({ alter: true });

    res.status(200).json('OK');
}
