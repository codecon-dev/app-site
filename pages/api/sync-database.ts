import Attendee from '@models/Attendee';
import EscapeRoom from '@models/EscapeRoom';
import LoginLink from '@models/LoginLink';
import Prize from '@models/Prize';
import User from '@models/User';
import Puzzle from '@models/puzzle/Puzzle';
import PuzzleAnswer from '@models/puzzle/PuzzleAnswer';
import { NextApiRequest, NextApiResponse } from 'next';
import dataSource from 'src/database/DataSource';

export default async function SyncDatabaseController(req: NextApiRequest, res: NextApiResponse) {
    console.log(Puzzle, User, PuzzleAnswer, EscapeRoom, Attendee, LoginLink, Prize);
    await dataSource.sync({ alter: true });

    res.status(200).json('OK');
}
