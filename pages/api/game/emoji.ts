import { query } from '@lib/db';
import { NextApiRequest, NextApiResponse } from 'next';
import { claimCodecodesApiToken } from '@lib/codecodes-api';
import { Props as EmojiRiddleProps } from '@components/game/emoji-riddle';
import { COOKIE } from '@lib/constants';

export type Response = {
  status: number;
  success: boolean;
  message: string;
  riddle?: EmojiRiddleProps;
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    let response: Response;

    const cookie = req.cookies[COOKIE] || '';
    const ticketNumber: string = cookie.split(':')[1] || req.body.userId || req.query.userId;

    switch (req.method?.toUpperCase()) {
      case 'GET':
        response = await get(ticketNumber);
        break;
      case 'POST':
        response = await answer(req.body.answer, req.body.id, ticketNumber);
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

async function get(ticketNumber: string): Promise<Response> {
  const riddle: EmojiRiddleProps[] = await query(
    `SELECT er.id, er.question, er.hint
                                                   FROM emoji_riddle er
                                                  WHERE NOT EXISTS (SELECT 1
                                                                      FROM emoji_riddle_attendees era
                                                                     WHERE era.attendees_id = ?
                                                                           AND era.emoji_riddle_id = er.id)
                                                  ORDER BY RAND()
                                                  LIMIT 1`,
    [ticketNumber]
  );

  return {
    status: 200,
    success: true,
    message: 'OK',
    riddle: riddle[0]
  };
}

async function answer(answer: string, id: number, ticketNumber: string): Promise<Response> {
  const answerSanitized: string = answer.toLowerCase().trim();

  const riddle: { id: number; code: string }[] = await query(
    `SELECT id, code
                                                                FROM emoji_riddle
                                                               WHERE id = ?
                                                                     AND LOWER(answer) = ? 
                                                               LIMIT 1`,
    [id, answerSanitized]
  );
  let success: boolean = typeof riddle[0]?.id !== 'undefined';

  if (!success) {
    return {
      status: 202,
      success: false,
      message: 'Opa, não é isso 😔'
    };
  }

  const answeredAlready: boolean =
    typeof (
      await query(
        `SELECT 1
                                                            FROM emoji_riddle_attendees
                                                           WHERE attendees_id = ?
                                                                 AND emoji_riddle_id = ?
                                                           LIMIT 1`,
        [ticketNumber, id]
      )
    )[0] !== 'undefined';
  if (answeredAlready) {
    return {
      status: 202,
      success: false,
      message: 'Você já respondeu essa charada, espertinho 😑'
    };
  }

  await query(
    `INSERT INTO emoji_riddle_attendees (attendees_id, emoji_riddle_id)
                       VALUES (?, ?)`,
    [ticketNumber, id]
  );

  const user = await query(
    `SELECT *
                                FROM attendees
                               WHERE ticket_number = ?
                               LIMIT 1`,
    [ticketNumber]
  );

  const { first_name, last_name, email } = user[0];

  await claimCodecodesApiToken({ name: `${first_name} ${last_name}`, email, code: riddle[0].code });

  return {
    status: 201,
    success: success,
    message: 'Resposta certa! Você ganhou 47 pontos no Code-codes 😉'
  };
}
