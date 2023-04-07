import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { StatusCodes } from 'http-status-codes';

import ApiResponse from 'src/api/ApiResponse';
import Attendee from 'src/database/model/Attendee';
import AttendeeService from 'src/services/AttendeeService';

type Events = 'DIGITAL' | 'SUMMIT' | 'FEATURE';

export default async function SymplaController(
    req: NextApiRequest,
    res: NextApiResponse
): Promise<void> {
    try {
        if (req.method != 'GET') {
            ApiResponse.build(res, StatusCodes.BAD_REQUEST, 'Método não permitido');
            return;
        }

        const event: Events = req.query.event as Events;
        const id = req.query.id as string;

        const attendee: Attendee | null = await Attendee.findBySymplaIdAndEvent(id, event);
        if (attendee) {
            ApiResponse.build(res, StatusCodes.OK, 'Participante encontrado', { attendee });
            return;
        }

        let symplaEventId;

        if (event == 'DIGITAL') {
            symplaEventId = process.env.SYMPLA_DIGITAL_ID;
        } else if (event == 'SUMMIT') {
            symplaEventId = process.env.SYMPLA_SUMMIT_ID;
        } else if (event == 'FEATURE') {
            symplaEventId = process.env.SYMPLA_FEATURE_ID;
        }

        const symplaData = await axios.get(
            `${process.env.SYMPLA_API_URL}/events/${symplaEventId}/orders/${id}/participants`,
            {
                headers: {
                    s_token: process.env.SYMPLA_API_KEY
                }
            }
        );

        if (!symplaData.data.data[0]) {
            ApiResponse.build(res, StatusCodes.NOT_FOUND, 'Pedido não encontrado');
            return;
        }

        await AttendeeService.createFromSympla(`${id}`, symplaData.data.data, event);

        ApiResponse.build(res, StatusCodes.OK, 'Login realizado com sucesso');
    } catch (exception) {
        console.error('SymplaController >> Ocorreu um erro inesperado', exception);
        ApiResponse.build(res, StatusCodes.INTERNAL_SERVER_ERROR, 'Ocorreu um erro desconhecido');
    }
}
