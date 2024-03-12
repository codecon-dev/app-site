import { StatusCodes } from 'http-status-codes';
import { NextApiRequest, NextApiResponse } from 'next';
import { Op } from 'sequelize';
import ApiResponse from 'src/api/ApiResponse';

import { setCookie } from 'cookies-next';
import LoginLink from 'src/database/model/LoginLink';
import Attendee from 'src/database/model/Attendee';

export type AttendeeLoginRequest = {
    otp: string;
    attendeeUuid: string;
};

export default async function LoginCheckController(
    req: NextApiRequest,
    res: NextApiResponse
): Promise<void> {
    try {
        if (req.method != 'POST') {
            ApiResponse.build(res, StatusCodes.BAD_REQUEST, 'Método não permitido');
            return;
        }

        const { otp, attendeeUuid }: AttendeeLoginRequest = req.body;

        const loginLink = await LoginLink.findOne({
            where: {
                hash: otp,
                attendeeUuid,
                expiresAt: { [Op.gt]: new Date() }
            }
        });

        if (!loginLink) {
            ApiResponse.build(
                res,
                StatusCodes.UNAUTHORIZED,
                'Este código não existe ou está expirado'
            );
            return;
        }

        setCookie('attendeeUuid', attendeeUuid, { req, res, maxAge: 60 * 6 * 24 });

        const attendee = await Attendee.findByUuid(attendeeUuid);

        if (!attendee) {
            ApiResponse.build(res, StatusCodes.UNAUTHORIZED, 'Ocorreu um erro desconhecido');
            return;
        }

        ApiResponse.build(res, StatusCodes.OK, 'Logado com sucesso!', {
            attendeeUuid: attendee.uuid,
            firstName: attendee.name,
            displayName: attendee.displayName,
            hasMobilePhone: attendee.mobilePhone ? true : false,
            hasAcceptedTerms: attendee.acceptedTerms
        });
    } catch (exception) {
        console.error('LoginController >> Ocorreu um erro inesperado', exception);
        ApiResponse.build(res, StatusCodes.INTERNAL_SERVER_ERROR, 'Ocorreu um erro desconhecido');
    }
}
