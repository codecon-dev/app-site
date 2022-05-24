import { query } from '@lib/db';
import { NextApiRequest, NextApiResponse } from 'next';
import { COOKIE } from '@lib/constants';

export type Response = {
  status: number;
  success: boolean;
  message: string;
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    let response: Response;

    const cookie = req.cookies[COOKIE] || '';
    const ticketNumber: string = cookie.split(':')[1] || req.body.userId || req.query.userId;

    switch (req.method?.toUpperCase()) {
      case 'POST':
        response = await register(req.body.gatherName, req.body.profileURI, ticketNumber);
        break;
      default:
        return res
          .status(405)
          .json({ error: { code: 'method_not_allowed', message: 'Método não aceito' } });
    }

    res.status(response.status).json(response);
  } catch (exception) {
    console.trace(exception);
    res.status(400).json({ error: { code: 'bad_request' } });
  }
};

async function register(
  gatherName: string,
  profileURI: number,
  ticketNumber: string
): Promise<Response> {
  const registeredAlready: boolean =
    typeof (
      await query(
        `SELECT 1
            FROM marathon_attendees
            WHERE attendees_id = ?
            LIMIT 1`,
        [ticketNumber]
      )
    )[0] !== 'undefined';
  if (registeredAlready) {
    return {
      status: 202,
      success: false,
      message: 'Você já está cadastrado 😑'
    };
  }

  await query(
    `INSERT INTO marathon_attendees (attendees_id, gather_name, profile_uri)
                       VALUES (?, ?, ?)`,
    [ticketNumber, gatherName, profileURI]
  );

  return {
    status: 201,
    success: true,
    message: 'Boa! Você está cadastrado. 😉'
  };
}
