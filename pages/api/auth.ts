import prisma from '@lib/cms-providers/prisma'
import { NextApiRequest, NextApiResponse } from 'next';
import * as LoginProvider from '@lib/providers/login-provider'
import { ticket, user } from '@prisma/client';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        switch (req.method) {
            case 'POST':
                await sendMagicLink(req, res)
                break
            case 'GET':
                await login(req, res)
                break
            default:
                throw { status: 501, message: 'Verbo HTTP não implementado' }
        }
    } catch (exception: any) {
        res.status(Number(exception.status) || 400).json({
            message: exception.message || exception
        })
    }
}

async function login(req: NextApiRequest, res: NextApiResponse) {
    const email: string = req.query.email.toString()
    const hash: string = req.query.hash.toString()

    const ticket: ticket | null = await prisma.ticket.findFirst({ where: { email: email } })
    if (!ticket) throw { status: 403, message: 'Usuário não encontrado ou hash expirado. Tente novamente' }

    await LoginProvider.login(hash, res)

    res.status(200).json({ message: 'Login realizado com sucesso' })
}

async function sendMagicLink(req: NextApiRequest, res: NextApiResponse) {
    const email = req.body.email as string;

    const emailSent = await LoginProvider.sendMagicLink(email)

    if (!emailSent) {
        res.status(401).json({ message: 'E-mail não está cadastrado' })
        return;
    }

    res.status(200).json({ message: 'Link mágico enviado com sucesso' })
}