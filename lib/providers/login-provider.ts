import prisma from '@lib/cms-providers/prisma'
import { login_link } from "@prisma/client";
import { NextApiResponse } from "next";
import { sendEmail } from "../utils";

const timeToExpireInHours = 24 * 3

export async function sendMagicLink(email: string): Promise<boolean> {
  const ticket = await prisma.ticket.findFirst({
    where: {
      email: email
    }
  })
  if (!ticket) return false;

  const magicLink = await createMagicLink(ticket.id);
  const subject = 'Seu link mágico chegou';
  const text = `Acesse este endereço para fazer login: https://shiftfestival.cc/rei-do-camarote/${magicLink.hash}`;
  const html = `<!doctype html><html><head><meta name="viewport" content="width=device-width"><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"><title>Sh*ft Festival</title></head><body><table width="100%" bgcolor="#F9F2EE" style="background-color: #F9F2EE;" border="0" cellpadding="0" cellspacing="0"><tr bgcolor="#F9F2EE" style="background-color: #F9F2EE;"><td>&nbsp;</td><td width="700" class="wrapper" style="font-family: 'Helvetiva', Arial, sans-serif; font-size: 14px; vertical-align: top; box-sizing: border-box;"> <br><table border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;"><tr><td><table width="600" align="center" border="0" cellpadding="0" cellspacing="0" style="background-color: #1230E0;" bgcolor="#1230E0"><tr height="40"><td colspan="3">&nbsp;</td></tr><tr><td width="50">&nbsp;</td><td><center> <img src="https://shiftfestival.cc/logo-b.png" width="100" style="display: block;" alt="Sh*ft Festival"></center></td><td width="50">&nbsp;</td></tr><tr height="40"><td colspan="3">&nbsp;</td></tr></table></td></tr><tr><td><table width="600" align="center" border="0" cellpadding="0" cellspacing="0" style="background-color: #fff;" bgcolor="#fff"><tr height="50"><td colspan="3">&nbsp;</td></tr><tr><td width="80">&nbsp;</td><td><center><h2 style="font-family: 'Helvetiva', Arial, sans-serif; font-size: 28px; line-height: 30px; margin:0; color:#1230E0;">Seu link mágico</h2><p style="font-family: 'Helvetiva', Arial, sans-serif;">Olá Sh*fter, esse é um email com um link mágico de login para seu perfil no site do Shift Festival.</p> <br> <a style="display: inline-block; padding: 10px 20px; background-color: #2ED573; font-weight: bolder; text-decoration: none; color:white;" href="https://shiftfestival.cc/rei-do-camarote/${magicLink.hash}">Clique aqui para acessar sua conta</a><p> ou copie o link abaixo<br> https://shiftfestival.cc/rei-do-camarote/${magicLink.hash}</p><p>Este link fica ativo por algumas horas. Se precisar entrar novamente na sua conta, vá até o site e peça um novo link :)</p></center></td><td width="80">&nbsp;</td></tr><tr height="50"><td colspan="3">&nbsp;</td></tr></table></td></tr></table> <br><br></td><td>&nbsp;</td></tr></table></body></html>`;

  await sendEmail(email, subject, text, html);

  return true;
}

export async function createMagicLink(ticketId: bigint): Promise<login_link> {
  const loginLink = await prisma.login_link.findFirst({
    where: {
      ticket_id: ticketId,
      expires_at: { gt: new Date() }
    }
  })
  if (loginLink) return loginLink

  return await prisma.login_link.create({
    data: {
      expires_at: new Date(new Date().getTime() + timeToExpireInHours * 60 * 60 * 1000),
      hash: Date.now().toString(36) + Math.random().toString(36).substring(2),
      ticket: { connect: { id: ticketId } }
    }
  })
}

export async function login(hash: string, res: NextApiResponse) {
  const loginLink = await prisma.login_link.findFirst({
    where: {
      hash: hash,
      expires_at: { gt: new Date() }
    }
  })

  if (!loginLink) throw { status: 403, message: 'Usuário não encontrado ou hash expirado. Tente novamente' }

  res.setHeader('Set-Cookie', `USERHASH=${loginLink.hash};path=/`)
}

export async function isLogged(hash: string): Promise<bigint | null> {
  const loginLink: login_link | null = await prisma.login_link.findFirst({
    where: {
      hash: hash,
      expires_at: { gt: new Date() }
    }
  })

  return loginLink ? loginLink?.ticket_id : null
}