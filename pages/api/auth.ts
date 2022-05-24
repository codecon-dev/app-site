/**
 * Copyright 2020 Vercel Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { NextApiRequest, NextApiResponse } from 'next';
import { COOKIE } from '@lib/constants';
import { query } from '@lib/db';

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  const id = req.cookies[COOKIE] || (req.query.id as string);
  if (!id) {
    return res.status(401).json({
      error: {
        code: 'missing_cookie',
        message: 'Missing cookie'
      }
    });
  }

  const [email, ticketNumber] = id.split(':');

  const queryResult = await query(
    `
    SELECT attendees.ticket_number as ticketNumber,
    attendees.first_name as firstName,
    attendees.last_name as lastName,
		attendees.email as email,
		github.username as username
	FROM attendees
	LEFT JOIN github ON attendees.github_id = github.id
    WHERE ticket_number = ? AND (email = ? OR email_gather = ?)
    `,
    [ticketNumber, email, email]
  );

  if (!queryResult[0]) {
    return res.status(401).json({
      error: {
        code: 'not_registered',
        message: 'This user is not registered'
      }
    });
  }

  const userData = {
    ticketNumber: queryResult[0].ticketNumber,
    name: `${queryResult[0].firstName} ${queryResult[0].lastName}`,
    email: queryResult[0].email,
    username: queryResult[0].username
  };

  return res.status(200).json({ loggedIn: true, userData });
}
