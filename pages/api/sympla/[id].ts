import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { ConfUser, OkPacket } from '@lib/types';
import validator from 'validator';
import { COOKIE } from '@lib/constants';
import cookie from 'cookie';
import ms from 'ms';
import { query, todayMysqlFormat } from '@lib/db';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { config } from '../../../package.json';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'GET':
      await get(req, res);
      break;
    default:
      throw { status: 501, message: 'Verbo HTTP não implementado' };
  }
};

async function get(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id } = req.query;
    const symplaData = await axios.get(
      `${process.env.SYMPLA_API_URL}/events/${process.env.SYMPLA_EVENT_ID}/orders/${id}/participants`,
      {
        headers: {
          s_token: process.env.SYMPLA_API_KEY
        }
      }
    );

    if (!symplaData.data.data[0]) throw { status: 404, message: 'Pedido não encontrado' };

    const data = symplaData.data.data[0];

    const email: string = ((data.email as string) || '').trim();
    let firstName: string = ((data.first_name as string) || '').trim();
    let lastName: string = ((data.last_name as string) || '').trim();
    let ticketNumber: number | undefined = undefined;
    let username: string | undefined = undefined;
    let name: string | undefined = undefined;
    let createdAt: string;
    let acceptedTerms = false;

    let statusCode: number;

    const userData = await query(
      `
        SELECT 
          attendees.ticket_number as ticketNumber,
          attendees.first_name as firstName,
          attendees.last_name as lastName,
          attendees.created_at as createdAt,
		  attendees.accepted_terms as acceptedTerms,
          github.username as username,
          github.name as name
        FROM attendees
        LEFT JOIN github ON attendees.github_id = github.id
        WHERE attendees.email = ?
        `,
      [email]
    );

    if (userData[0]) {
      ({ ticketNumber, firstName, lastName, username, name, createdAt, acceptedTerms } =
        userData[0]);
      statusCode = 200;
    } else {
      createdAt = todayMysqlFormat();

      const results: OkPacket = await query(
        `
          INSERT INTO attendees 
          (
            first_name,
            last_name,
            email,
            created_at,
            sympla_id
          )
          VALUES (?, ?, ?, ?, ?)
          `,
        [firstName, lastName, email, createdAt, `${id}`]
      );

      ticketNumber = results.insertId;
      statusCode = 201;
    }

    // Save `key` in a httpOnly cookie
    if (config.useCookies) {
      res.setHeader(
        'Set-Cookie',
        cookie.serialize(COOKIE, `${email}:${ticketNumber}`, {
          httpOnly: true,
          sameSite: 'strict',
          secure: process.env.NODE_ENV === 'production',
          path: '/api',
          expires: new Date(Date.now() + ms('7 days'))
        })
      );
    }

    return res.status(statusCode).json({
      email,
      ticketNumber,
      createdAt,
      name: name ? name : `${firstName} ${lastName}`,
      username,
      acceptedTerms
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({});
  }
}
