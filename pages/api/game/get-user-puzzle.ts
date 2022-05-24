import { query } from '@lib/db';
import { NextApiRequest, NextApiResponse } from 'next';
import { COOKIE } from '@lib/constants';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method != 'POST')
    return res
      .status(404)
      .json({ error: { code: 'method_unknown', message: 'This endpoint only responds to POST' } });

  const cookie = req.cookies[COOKIE] || '';
  const userId = req.body.userId || cookie.split(':')[1];
  const puzzleId: string = (req.body.id as string) || '';

  const userAnswer = await query(
    `
        SELECT 
            puzzle_id
        FROM puzzles_attendees
        WHERE 
			puzzle_id = ? 
			AND attendee_ticket = ?`,
    [puzzleId, userId]
  );

  const userAnswered: boolean = typeof userAnswer[0]?.puzzle_id !== 'undefined';

  res.status(200).json({
    success: true,
    userAnswered
  });
};
