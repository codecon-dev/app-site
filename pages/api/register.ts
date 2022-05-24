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

import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { ConfUser, OkPacket } from '@lib/types';
import validator from 'validator';
import { COOKIE } from '@lib/constants';
import cookie from 'cookie';
import ms from 'ms';
import nodemailer from 'nodemailer';
import { query, todayMysqlFormat } from '@lib/db';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { config } from '../../package.json'

type ErrorResponse = {
  error: {
    code: string;
    message: string;
  };
};

export default async function register(
  req: NextApiRequest,
  res: NextApiResponse<ConfUser | ErrorResponse>
) {
  if (req.method !== 'POST') {
    return res.status(501).json({
      error: {
        code: 'method_unknown',
        message: 'This endpoint only responds to POST'
      }
    });
  }

  const email: string = ((req.body.email as string) || '').trim().toLowerCase();
  if (!validator.isEmail(email)) {
    return res.status(400).json({
      error: {
        code: 'bad_email',
        message: 'Invalid email'
      }
    });
  }

  let firstName: string = ((req.body.name as string) || '').trim();
  let lastName: string = ((req.body.lastName as string) || '').trim();
  const city: string = (req.body.city as string) || '';
  const estate: string = (req.body.estate as string) || '';
  const segment: string = (req.body.segment as string) || '';
  const role: string = (req.body.role as string) || '';
  const experience: string = (req.body.experience as string) || '';
  const acceptNewsletter: string = (req.body.acceptNewsletter as string) || '';
  const acceptSponsors: string = (req.body.acceptSponsors as string) || '';

  let ticketNumber: number | undefined = undefined;
  let statusCode: number;
  let username: string | undefined = undefined;
  let name: string | undefined = undefined;
  let createdAt: string;

  const userData = await query(
    `
    SELECT 
      attendees.ticketNumber as ticketNumber,
      attendees.firstName as firstName,
      attendees.lastName as lastName,
      attendees.createdAt as createdAt,
      github.username as username,
      github.name as name
    FROM attendees
    LEFT JOIN github ON attendees.github_id = github.id
    WHERE attendees.email = ?
    `,
    [email]
  );

  if (userData[0]) {
    ({ ticketNumber, firstName, lastName, username, name, createdAt } = userData[0]);
    statusCode = 200;
  } else {
    createdAt = todayMysqlFormat();

    const results: OkPacket = await query(
      `
      INSERT INTO attendees 
      (
        firstName,
        lastName,
        email,
        city,
        estate,
        segment,
        role,
        experience,
        acceptNewsletter,
        acceptSponsors,
        createdAt,
        active
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        firstName,
        lastName,
        email,
        city,
        estate,
        segment,
        role,
        experience,
        acceptNewsletter,
        acceptSponsors,
        createdAt,
        1
      ]
    );

    ticketNumber = results.insertId;
    statusCode = 201;

    const emailHTML = `<!doctype html><html> <head> <meta name="viewport" content="width=device-width"> <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"> <title>Codecon</title> <style>@import url("https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;700&display=swap"); </style> </head> <body> <table width="100%" bgcolor="#141414" style="background-color: #141414;" border="0" cellpadding="0" cellspacing="0"> <tr bgcolor="#141414" style="background-color: #141414;"> <td>&nbsp;</td><td width="700" class="wrapper" style="font-family: 'IBM Plex Mono', monospace; font-size: 14px; vertical-align: top; box-sizing: border-box;"> <br><table border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;"> <tr height="100"> <td> <center> <img src="https://codecon21.vercel.app/logo.png" width="280" style="display: block;" alt="Codecon"> </center> </td></tr><tr height="400"> <td> <img src="https://codecon21.vercel.app/api/ticket-images/${ticketNumber}" width="700" style="display: block;" alt="Seu ingresso"> </td></tr><tr> <td> <table width="600" align="center" border="0" cellpadding="0" cellspacing="0" style="background-color: #fff;" bgcolor="#fff"> <tr height="50"> <td colspan="3">&nbsp;</td></tr><tr> <td width="50">&nbsp;</td><td> <center> <h2 style="font-family: 'IBM Plex Mono', monospace; font-size: 28px; line-height: 30px; margin:0;">Você garantiu sua vaga<br>na Codecon Digital!</h2> <p style="font-family: 'IBM Plex Mono', monospace;">Para você ter uma melhor experiência no evento, pedimos que você entre na nossa comunidade no Discord. Por lá vão rolar várias atividades paralelas e o networking. Ah! E não esqueça também de salvar o evento em seu calendário.</p><br><a href="https://discord.gg/Cz4zgUr"><img src="https://codecon21.vercel.app/discord.png" alt="Acesse nosso Discord" width="45%"></a> <a href="https://calendar.google.com/event?action=TEMPLATE&tmeid=NWZjbzMxM2Zqcmw1ajIxY3F1cDljZTk4YW5fMjAyMTA0MjFUMjIwMDAwWiAxamtzMWtqY2VhZDE1MnRjNmVvdHFidmFvc0Bn&tmsrc=1jks1kjcead152tc6eotqbvaos%40group.calendar.google.com&scp=ALL"><img src="https://codecon21.vercel.app/calendario.png" alt="Adicione ao seu calendario" width="45%"></a> </center> </td><td width="50">&nbsp;</td></tr><tr height="50"> <td colspan="3">&nbsp;</td></tr></table> </td></tr><tr> <td> <table width="600" align="center" border="0" cellpadding="0" cellspacing="0" style="background-color: #707070;" bgcolor="#707070"> <tr height="50"> <td colspan="3">&nbsp;</td></tr><tr> <td width="80">&nbsp;</td><td> <center> <h2 style="color: #fff; font-family: 'IBM Plex Mono', monospace; font-size: 28px; line-height: 30px; margin:0;">Confira também<br>nossos workshops</h2> <p style="color: #fff; font-family: 'IBM Plex Mono', monospace;">Teremos vários workshops durante a tarde, nos dias 21, 22 e 23 de abril. Eles tem vagas limitadas e o custo de R$ 29 por inscrição.</p><br><a href="https://codecon.dev/workshops"><img src="https://codecon21.vercel.app/workshops.png" alt="Confira nossos workshops" width="60%"></a> </center> </td><td width="80">&nbsp;</td></tr><tr height="50"> <td colspan="3">&nbsp;</td></tr></table> </td></tr><tr> <td> <table width="600" align="center" border="0" cellpadding="0" cellspacing="0" style="background-color: #fff;" bgcolor="#fff"> <tr height="50"> <td colspan="3">&nbsp;</td></tr><tr> <td width="80">&nbsp;</td><td> <center> <h2 style="font-family: 'IBM Plex Mono', monospace; font-size: 28px; line-height: 30px; margin:0;">O evento será transmitido ao vivo na Twitch</h2> <p style="font-family: 'IBM Plex Mono', monospace;">Fique ligado no seu e-mail, te enviaremos o link assim que o evento iniciar. Ou você pode entrar na nossa comunidade e receber o aviso por lá. Ou você pode dar um follow na <a href="http://twitch.com/pachicode" style="color: #000;">@pachicodes</a> e receber notificação de quando ela estiver online :)</p><br><a href="https://twitch.tv/pachicodes"><img src="https://codecon21.vercel.app/twitch.png" alt="Siga a @pachicodes" width="65%"></a> </center> </td><td width="80">&nbsp;</td></tr><tr height="50"> <td colspan="3">&nbsp;</td></tr></table> </td></tr></table> <br><center><img src="https://codecon21.vercel.app/rodape.png" width="300" alt="Esperamos você lá"></center> <br></td><td>&nbsp;</td></tr></table> </body></html>`;

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_SERVER,
      port: Number(process.env.SMTP_PORT),
      secure: true, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER, // generated ethereal user
        pass: process.env.SMTP_PASSWORD // generated ethereal password
      }
    } as SMTPTransport.Options);

    const info = await transporter.sendMail({
      from: '"Codecon" <naoresponda@codecon.dev>', // sender address
      to: email, // list of receivers
      subject: 'Codecon 2021 ✔ Inscrição confirmada', // Subject line
      text: 'Você garantiu sua vaga na Codecon Digital!\n\nPara você ter a melhor experiência no evento, pedimos que você entre na nossa comunidade no Discord (https://discord.gg/Cz4zgUr) e também salve o evento em seu calendário.',
      html: emailHTML // html body
    });

    void axios.post(
      'https://discordapp.com/api/webhooks/822442058194616360/ukPmy-QtdwAlOMuqWd-VK420YZb8DKSCJ2E5CKH4H_sUu5Mb35QkPDi3bXbW91iFmoMa',
      {
        content: `Novo inscrito na Codecon 2021 :tada: ${email}`
      }
    );
  }

  // Save `key` in a httpOnly cookie
  if (config.useCookies) {
    res.setHeader(
      'Set-Cookie',
      cookie.serialize(COOKIE, `${ticketNumber}`, {
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
    username
  });
}
