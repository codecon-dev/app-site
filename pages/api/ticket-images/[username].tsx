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
import screenshot from '@lib/screenshot';
import { SITE_URL, SAMPLE_TICKET_NUMBER } from '@lib/constants';
import { query } from '@lib/db';

export default async function ticketImages(req: NextApiRequest, res: NextApiResponse) {
  let url: string;
  const { username } = req.query || {};
  if (username) {
    const usernameString = username.toString();
    const userData = await query(
      `
      SELECT 
        attendees.ticket_number as ticketNumber,
        attendees.first_name as firstName,
        attendees.last_name as lastName,
        github.name as name,
        github.username as github
      FROM attendees
      LEFT JOIN github ON github.id = attendees.github_id
      WHERE attendees.ticket_number = ?
      `,
      [usernameString]
    );
    
    const {name, firstName, lastName, ticketNumber, github} = userData[0];
    let fullName;

    if (firstName) {
      fullName = `${firstName} ${lastName}`;
    } else if (name) {
      fullName = name;
    }
    
    if (!ticketNumber) {
      res.statusCode = 404;
      return res.end('Not Found');
    }
    url = `${SITE_URL}/ticket-image?ticketNumber=${encodeURIComponent(ticketNumber)}`;
    if (fullName) {
      url = `${url}&name=${encodeURIComponent(fullName)}`;
    }
    
    if (github) {
      url = `${url}&username=${encodeURIComponent(github)}`;
    }
   
    const file = await screenshot(url);
    res.setHeader('Content-Type', `image/png`);
    res.setHeader(
      'Cache-Control',
      `public, immutable, no-transform, s-maxage=31536000, max-age=31536000`
    );
    res.statusCode = 200;
    res.end(file);
  } else {
    res.status(404).send('Not Found');
  }
}
