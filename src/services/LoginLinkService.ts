import { Op } from 'sequelize';
import { NextApiResponse } from 'next';
import sendgrid from '@sendgrid/mail';

import Attendee from 'src/database/model/Attendee';
import LoginLink from 'src/database/model/LoginLink';

export default class LoginLinkService {
    public static async sendMagicLink(email: string, event?: string): Promise<boolean> {
        const attendee: Attendee | null = await Attendee.findByEmail(email);
        if (!attendee || !event) return false;

        const magicLink = await this.createMagicLink(attendee.id);

        sendgrid.setApiKey(process.env.SENDGRID_API_KEY || '');

        const msg = {
            to: email,
            from: {
                email: 'contato@codecon.dev',
                name: 'Codecon'
            },
            templateId: 'd-59ea463e92bf4729a0b9d143a9862744',
            dynamicTemplateData: {
                url: `https://codecon.dev/${event.toLowerCase()}/inscrito/${magicLink.hash}`
            }
        };

        const sendMail = await sendgrid.send(msg);

        if (!sendMail) {
            return false;
        }

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

    public static async login(hash: string, suffix: string, res: NextApiResponse) {
        const loginLink = await LoginLink.findOne({
            where: {
                hash: hash,
                expiresAt: { [Op.gt]: new Date() }
            }
        });

        if (!loginLink) throw new Error('Usuário não encontrado ou hash expirado. Tente novamente');

        res.setHeader('Set-Cookie', `USERHASH${suffix}=${loginLink.hash};path=/`);
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
