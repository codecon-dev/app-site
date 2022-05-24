import { NextApiRequest, NextApiResponse } from 'next';
import { query } from '@lib/db';

export default async function terms(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(501).json({
      error: {
        code: 'method_unknown',
        message: 'This endpoint only responds to GET'
      }
    });
  }

  const { id } = req.query;

  await query(
    `
	 UPDATE attendees 
	 SET accepted_terms = 1
	 WHERE ticket_number = ?
	 `,
    [id.toString()]
  );

  return res.status(200).json({});
}
