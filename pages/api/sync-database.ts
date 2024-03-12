import Attendee from '@models/Attendee';
import MissionBoard from '@models/MissionBoard';
import LoginLink from '@models/LoginLink';
import Prize from '@models/Prize';
import Chest from '@models/chest/Chest';
import ChestOpen from '@models/chest/ChestOpen';
import Puzzle from '@models/puzzle/Puzzle';
import PuzzleAnswer from '@models/puzzle/PuzzleAnswer';
import { NextApiRequest, NextApiResponse } from 'next';
import dataSource from 'src/database/DataSource';

export default async function SyncDatabaseController(req: NextApiRequest, res: NextApiResponse) {
    console.log(Puzzle, Attendee, PuzzleAnswer, MissionBoard, LoginLink, Prize, Chest, ChestOpen);

    await dataSource.sync({ alter: true });

    res.status(200).json('OK');
}
