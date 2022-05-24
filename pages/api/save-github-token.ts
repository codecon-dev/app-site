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
import { query } from '@lib/db';

export default async function saveGithubToken(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(501).json({
      error: {
        code: 'method_unknown',
        message: 'This endpoint only responds to POST'
      }
    });
  }

  const body = req.body;

  if (!body.token || !body.ticketNumber) {
    return res.status(400).json({
      error: {
        code: 'bad_input',
        message: 'Invalid parameters'
      }
    });
  }

  const userData = await query(
    `
    SELECT first_name, ticket_number FROM attendees
    WHERE ticket_number = ?
    `,
    [body.ticketNumber]
  );

  if (!userData[0]) {
    return res.status(404).json({ code: 'invalid_id', message: 'The registration does not exist' });
  }

  const githubData = await query(
    `
    SELECT id, username, name FROM github
    WHERE token = ?
    `,
    [body.token]
  );

  const { ticket_number } = userData[0];
  const { id, username, name } = githubData[0];

  if (!username) {
    return res.status(400).json({ code: 'invalid_token', message: 'Invalid or expired token' });
  }

  await query(
    `
    UPDATE attendees 
    SET github_id = '${id}'
    WHERE ticket_number = ?
    `,
    [ticket_number]
  );

  res.json({ username, name });
}
