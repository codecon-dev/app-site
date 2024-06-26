import { NextApiRequest, NextApiResponse } from 'next';
import { StatusCodes } from 'http-status-codes';

import { setCookie } from 'cookies-next';
import ApiResponse from 'src/api/ApiResponse';
import { getUser as getCodecodesUser } from '@lib/codecodes-api';
import Attendee from 'src/database/model/Attendee';
import LoginLinkService from 'src/services/LoginLinkService';

export default async function AuthController(req: NextApiRequest, res: NextApiResponse) {
    try {
        switch (req.method) {
            case 'POST':
                await sendMagicLink(req, res);
                break;
            case 'GET':
                await getUser(req, res);
                break;
            case 'DELETE':
                logoutUser(req, res);
                break;
            default:
                ApiResponse.build(res, StatusCodes.BAD_REQUEST, 'Método não permitido');
        }
    } catch (exception) {
        console.error('AuthController >> Ocorreu um erro inesperado', exception);
        ApiResponse.build(res, StatusCodes.INTERNAL_SERVER_ERROR, 'Ocorreu um erro desconhecido');
    }
}

async function sendMagicLink(req: NextApiRequest, res: NextApiResponse) {
    const email: string = req.body.email;

    const attendee = await Attendee.findByEmail(email);

    if (!attendee) {
        ApiResponse.build(res, StatusCodes.UNAUTHORIZED, 'Este e-mail não está inscrito.');
        return;
    }

    const emailSent = await LoginLinkService.sendMagicLink(attendee.email, attendee.event);

    if (!emailSent) {
        ApiResponse.build(res, StatusCodes.UNAUTHORIZED, 'E-mail não está cadastrado');
        return;
    }

    ApiResponse.build(res, StatusCodes.OK, 'Confira seu e-mail!', {
        uuid: attendee.uuid
    });
}

async function getUser(req: NextApiRequest, res: NextApiResponse) {
    const uuid: string = req.query.uuid as string;

    const attendee = await Attendee.findByUuid(uuid);

    if (!attendee) {
        ApiResponse.build(res, StatusCodes.UNAUTHORIZED, 'Usuário não encontrado');
        return;
    }

    const codeCodesUser = await getCodecodesUser(attendee.email);
    let userClaims = 0;

    if (codeCodesUser.data?.user?.tokens && codeCodesUser.status !== 'error') {
        userClaims = codeCodesUser.data.user.tokens.length;
    }

    ApiResponse.build(res, StatusCodes.OK, 'Sucesso', {
        attendeeNumber: attendee.id,
        attendeeUuid: attendee.uuid,
        firstName: attendee.name,
        displayName: attendee.displayName,
        hasMobilePhone: attendee.mobilePhone ? true : false,
        hasAcceptedTerms: attendee.acceptedTerms,
        githubFullName: attendee.githubFullName,
        githubUsername: attendee.githubUsername,
        isAdmin: attendee.isAdmin,
        hasMadeClaims: userClaims > 0
    });
}

function logoutUser(req: NextApiRequest, res: NextApiResponse) {
    setCookie('attendeeUuid', '', { req, res, maxAge: 0 });
    ApiResponse.build(res, StatusCodes.OK, 'Deslogado com sucesso!');
}
