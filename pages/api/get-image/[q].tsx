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
 import { SITE_URL } from '@lib/constants';
 import { query } from '@lib/db';
 
 export default async function getImage(req: NextApiRequest, res: NextApiResponse) {
   let url = "";
   let width = 2000;
   let height = 1000;
   const { q, type } = req.query || {};

   if (q && type) {
     if (!type) {
       res.statusCode = 404;
       return res.end('Not Found');
     }

	 switch (type) {
		case 'sponsor':
			url = `${SITE_URL}/patrocinadores/image/${encodeURIComponent(q.toString())}`;
			break;
		case 'sponsor-square':
			url = `${SITE_URL}/patrocinadores/image-square/${encodeURIComponent(q.toString())}`;
			width = 1500;
			height = 1500;
			break;
		case 'sponsor-stories':
			url = `${SITE_URL}/patrocinadores/image-stories/${encodeURIComponent(q.toString())}`;
			width = 1080;
			height = 1920;
			break;
		case 'speaker':
			url = `${SITE_URL}/quem-vai/image/${encodeURIComponent(q.toString())}`;
			break;
		case 'speaker-square':
			url = `${SITE_URL}/quem-vai/image-square/${encodeURIComponent(q.toString())}`;
			width = 1500;
			height = 1500;
			break;
		case 'speaker-stories':
			url = `${SITE_URL}/quem-vai/image-stories/${encodeURIComponent(q.toString())}`;
			width = 1080;
			height = 1920;
			break;
	 }

     if (!url) {
         return;
     }
     
     
     const file = await screenshot(url, width, height);
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
 