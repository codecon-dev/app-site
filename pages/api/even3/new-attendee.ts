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

        const data = req.body.data;
        const attendee = data.pessoa;

        const fullName = attendee.nome as string;
        const fullNameSplit = fullName.split(' ');

        const even3Id: string = data.inscricao.id;
        const name: string = fullNameSplit[0];
        const lastName: string = fullNameSplit[fullNameSplit.length - 1];
        const displayName: string = attendee.nome_para_cracha;
        const email: string = attendee.email;
        const event = 'SUMMIT';

        await AttendeeService.create(even3Id, name, lastName, displayName, email, event);

        ApiResponse.build(res, StatusCodes.OK, 'Tudo certo');
    } catch (exception) {
        console.error('SymplaController >> Ocorreu um erro inesperado', exception);
        ApiResponse.build(res, StatusCodes.INTERNAL_SERVER_ERROR, 'Ocorreu um erro desconhecido');
    }
}
