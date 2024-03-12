import { NextApiRequest, NextApiResponse } from 'next';
import { StatusCodes } from 'http-status-codes';

import ApiResponse from 'src/api/ApiResponse';
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

        const attendee = req.body.pessoa;

        const fullName = attendee.nome as string;

        const even3Id: string = req.body.inscricao.id;
        const name: string = fullName.split(' ')[0];
        const lastName: string = fullName.split(' ')[-1];
        const email: string = attendee.email;
        const event = 'SUMMIT';

        await AttendeeService.create(even3Id, name, lastName, email, event);

        ApiResponse.build(res, StatusCodes.OK, 'Tudo certo');
    } catch (exception) {
        console.error('SymplaController >> Ocorreu um erro inesperado', exception);
        ApiResponse.build(res, StatusCodes.INTERNAL_SERVER_ERROR, 'Ocorreu um erro desconhecido');
    }
}
