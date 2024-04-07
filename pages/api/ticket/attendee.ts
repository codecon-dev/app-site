import { NextApiRequest, NextApiResponse } from 'next';
import { StatusCodes } from 'http-status-codes';

import ApiResponse from 'src/api/ApiResponse';
import Attendee, { Event } from 'src/database/model/Attendee';

export default async function AttendeeTicketController(req: NextApiRequest, res: NextApiResponse) {
    try {
        switch (req.method) {
            case 'GET':
                await get(req, res);
                break;
            case 'PUT':
                await update(req, res);
                break;
            default:
                ApiResponse.build(res, StatusCodes.BAD_REQUEST, 'Método não permitido');
        }
    } catch (exception) {
        console.error('AttendeeTicketController >> Ocorreu um erro inesperado', exception);
        ApiResponse.build(res, StatusCodes.INTERNAL_SERVER_ERROR, 'Ocorreu um erro desconhecido');
    }
}

async function update(req: NextApiRequest, res: NextApiResponse) {
    const uuid: number = req.body.id;
    const username: string = req.body.username;
    const fullName: string = req.body.fullName;

    await Attendee.update(
        { githubUsername: username, githubFullName: fullName },
        { where: { uuid: uuid } }
    );

    ApiResponse.build(res, StatusCodes.OK, 'Login realizado com sucesso');
}

async function get(req: NextApiRequest, res: NextApiResponse) {
    const event: Event = req.query.event as Event;
    const attendees = await Attendee.findAllWithgithubUsernameAndEvent(event);

    const firstFiveAttendess = attendees?.reverse().slice(0, 5);

    ApiResponse.build(res, StatusCodes.OK, 'Login realizado com sucesso', {
        attendees: firstFiveAttendess,
        count: attendees?.length
    });
}
