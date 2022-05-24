import { NextApiRequest, NextApiResponse } from 'next';
import { COOKIE } from '@lib/constants';
import cookie from 'cookie';
import ms from 'ms';
import { query } from '@lib/db';
import { config } from '../../package.json';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'POST':
      await post(req, res);
      break;
    default:
      throw { status: 501, message: 'Verbo HTTP não implementado' };
  }
};

async function post(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { email } = req.body;

    const userData = await query(
      `
      SELECT 
        attendees.ticket_number as ticketNumber,
        attendees.first_name as firstName,
        attendees.last_name as lastName,
        attendees.accepted_terms as acceptedTerms,
        attendees.created_at as createdAt,
        github.username as username,
        github.name as name
      FROM attendees
      LEFT JOIN github ON attendees.github_id = github.id
      WHERE attendees.email = ? OR attendees.email_gather = ?
      `,
      [email, email]
    );

    const user = userData[0];

    if (!user) {
      return res.status(404).json({
        error: {
          code: 'not_registered',
          message: 'This user is not registered'
        }
      });
    }

    const { ticketNumber, firstName, lastName, username, name, createdAt, acceptedTerms } = user;

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

    return res.status(200).json({
      email,
      ticketNumber,
      createdAt,
      name: name ? name : `${firstName} ${lastName}`,
      username,
      acceptedTerms
    });
  } catch (error) {
    return res.status(404).json({});
  }
}
