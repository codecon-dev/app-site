import { Op } from 'sequelize';
import { NextApiResponse } from 'next';

import Attendee from 'src/database/model/Attendee';
import LoginLink from 'src/database/model/LoginLink';

export default class LoginLinkService {
    public static async sendMagicLink(email: string): Promise<boolean> {
        const attendee: Attendee | null = await Attendee.findByEmail(email);
        if (!attendee) return false;

        const magicLink = await this.createMagicLink(attendee.id);
        const subject = 'Seu link mágico chegou';
        const text = `Acesse este endereço para fazer login: https://shiftfestival.cc/rei-do-camarote/${magicLink.hash}`;
        const html = `<!doctype html><html><head><meta name="viewport" content="width=device-width"><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"><title>Sh*ft Festival</title></head><body><table width="100%" bgcolor="#F9F2EE" style="background-color: #F9F2EE;" border="0" cellpadding="0" cellspacing="0"><tr bgcolor="#F9F2EE" style="background-color: #F9F2EE;"><td>&nbsp;</td><td width="700" class="wrapper" style="font-family: 'Helvetiva', Arial, sans-serif; font-size: 14px; vertical-align: top; box-sizing: border-box;"> <br><table border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;"><tr><td><table width="600" align="center" border="0" cellpadding="0" cellspacing="0" style="background-color: #1230E0;" bgcolor="#1230E0"><tr height="40"><td colspan="3">&nbsp;</td></tr><tr><td width="50">&nbsp;</td><td><center> <img src="https://shiftfestival.cc/logo-b.png" width="100" style="display: block;" alt="Sh*ft Festival"></center></td><td width="50">&nbsp;</td></tr><tr height="40"><td colspan="3">&nbsp;</td></tr></table></td></tr><tr><td><table width="600" align="center" border="0" cellpadding="0" cellspacing="0" style="background-color: #fff;" bgcolor="#fff"><tr height="50"><td colspan="3">&nbsp;</td></tr><tr><td width="80">&nbsp;</td><td><center><h2 style="font-family: 'Helvetiva', Arial, sans-serif; font-size: 28px; line-height: 30px; margin:0; color:#1230E0;">Seu link mágico</h2><p style="font-family: 'Helvetiva', Arial, sans-serif;">Olá Sh*fter, esse é um email com um link mágico de login para seu perfil no site do Shift Festival.</p> <br> <a style="display: inline-block; padding: 10px 20px; background-color: #2ED573; font-weight: bolder; text-decoration: none; color:white;" href="https://shiftfestival.cc/rei-do-camarote/${magicLink.hash}">Clique aqui para acessar sua conta</a><p> ou copie o link abaixo<br> https://shiftfestival.cc/rei-do-camarote/${magicLink.hash}</p><p>Este link fica ativo por algumas horas. Se precisar entrar novamente na sua conta, vá até o site e peça um novo link :)</p></center></td><td width="80">&nbsp;</td></tr><tr height="50"><td colspan="3">&nbsp;</td></tr></table></td></tr></table> <br><br></td><td>&nbsp;</td></tr></table></body></html>`;

        //await sendEmail(attendee.email, subject, text, html);

        return true;
    }

    private static async createMagicLink(attendeeId: number): Promise<LoginLink> {
        const loginLink: LoginLink | null = await LoginLink.findOne({
            where: {
                attendeeId: attendeeId,
                expiresAt: { [Op.gt]: new Date() }
            }
        });
        if (loginLink) return loginLink;

        return await this.findOrCreate(attendeeId);
    }

    private static async findOrCreate(attendeeId: number): Promise<LoginLink> {
        const timeToExpireInHours = 24 * 3;
        const hash = Date.now().toString(36) + Math.random().toString(36).substring(2);
        const expiresAt = new Date(new Date().getTime() + timeToExpireInHours * 60 * 60 * 1000);

        const [loginLink, created] = await LoginLink.findOrCreate({
            where: { hash, expiresAt, attendeeId }
        });

        return await loginLink.save();
    }

    public static async login(hash: string, res: NextApiResponse) {
        const loginLink = await LoginLink.findOne({
            where: {
                hash: hash,
                expiresAt: { [Op.gt]: new Date() }
            }
        });

        if (!loginLink) throw new Error('Usuário não encontrado ou hash expirado. Tente novamente');

        res.setHeader('Set-Cookie', `USERHASH=${loginLink.hash};path=/`);
    }

    public static async isLogged(hash: string): Promise<number | undefined> {
        const loginLink: LoginLink | null = await LoginLink.findOne({
            where: {
                hash: hash,
                expiresAt: { [Op.gt]: new Date() }
            }
        });

        return loginLink ? loginLink?.attendeeId : undefined;
    }
}
