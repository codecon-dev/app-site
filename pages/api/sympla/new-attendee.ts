import { NextApiRequest, NextApiResponse } from 'next';
import { StatusCodes } from 'http-status-codes';

import ApiResponse from 'src/api/ApiResponse';
import Attendee from 'src/database/model/Attendee';
import AttendeeService from 'src/services/AttendeeService';

export default async function NewAttendeeController(
    req: NextApiRequest,
    res: NextApiResponse
): Promise<void> {
    try {
        if (req.method != 'POST') {
            ApiResponse.build(res, StatusCodes.BAD_REQUEST, 'Método não permitido');
            return;
        }

        if (req.body.api_key !== process.env.PLUGA_API_KEY) {
            console.log(process.env.PLUGA_API_KEY);
            console.log(req.body);
            console.log(req.headers);

            ApiResponse.build(res, StatusCodes.UNAUTHORIZED, 'Chave inválida');
            return;
        }

        const id: string = req.body.id;
        const name: string = req.body.name;
        const lastName: string = req.body.last_name;
        const email: string = req.body.email;
        const event: 'DIGITAL' | 'SUMMIT' | 'FEATURE' = req.body.event;

        await AttendeeService.sendWelcomeEmail(id, name, lastName, email, event);

        ApiResponse.build(res, StatusCodes.OK, 'Tudo certo');
    } catch (exception) {
        console.error('SymplaController >> Ocorreu um erro inesperado', exception);
        ApiResponse.build(res, StatusCodes.INTERNAL_SERVER_ERROR, 'Ocorreu um erro desconhecido');
    }
}
