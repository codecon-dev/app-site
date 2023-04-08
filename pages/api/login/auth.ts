import { NextApiRequest, NextApiResponse } from 'next';
import { StatusCodes } from 'http-status-codes';

import ApiResponse from 'src/api/ApiResponse';
import Attendee from 'src/database/model/Attendee';
import LoginLinkService from 'src/services/LoginLinkService';

export default async function AuthController(req: NextApiRequest, res: NextApiResponse) {
    try {
        switch (req.method) {
            case 'POST':
                await sendMagicLink(req, res);
                break;
            default:
                ApiResponse.build(res, StatusCodes.BAD_REQUEST, 'Método não permitido');
        }
    } catch (exception) {
        console.error('SymplaController >> Ocorreu um erro inesperado', exception);
        ApiResponse.build(res, StatusCodes.INTERNAL_SERVER_ERROR, 'Ocorreu um erro desconhecido');
    }
}

async function sendMagicLink(req: NextApiRequest, res: NextApiResponse) {
    const email: string = req.body.email;
    const order: string = req.body.order;

    const attendee = await Attendee.findBySymplaIdAndEmail(order, email);

    if (!attendee) {
        ApiResponse.build(
            res,
            StatusCodes.UNAUTHORIZED,
            'Este não é o mesmo e-mail de compra no Sympla'
        );
        return;
    }

    const emailSent = await LoginLinkService.sendMagicLink(attendee.email, attendee.event);

    if (!emailSent) {
        ApiResponse.build(res, StatusCodes.UNAUTHORIZED, 'E-mail não está cadastrado');
        return;
    }

    ApiResponse.build(res, StatusCodes.OK, 'Link mágico enviado com sucesso');
}
