import { NextApiRequest, NextApiResponse } from 'next';
import { StatusCodes } from 'http-status-codes';

import ApiResponse from 'src/api/ApiResponse';
import LikesService from 'src/services/LikesService';

export default async function LikesController(req: NextApiRequest, res: NextApiResponse) {
    try {
        switch (req.method) {
            case 'POST':
                await likeOrDislike(req, res);
                break;
            case 'GET':
                await get(req, res);
                break;
            default:
                ApiResponse.build(res, StatusCodes.BAD_REQUEST, 'Método não permitido');
        }
    } catch (exception) {
        console.error('LikesController >> Ocorreu um erro inesperado', exception);
        ApiResponse.build(res, StatusCodes.INTERNAL_SERVER_ERROR, 'Ocorreu um erro desconhecido');
    }
}

async function likeOrDislike(req: NextApiRequest, res: NextApiResponse) {
    const talkId: string = req.body.talkId;
    const attendeeUuid: string = req.body.attendeeUuid;

    if (!attendeeUuid) {
        ApiResponse.build(res, StatusCodes.UNAUTHORIZED, 'Usuário não logado');
        return;
    }

    const likesResponse = await LikesService.likeOrDislike(talkId, attendeeUuid);

    ApiResponse.build(res, StatusCodes.OK, 'Done!', likesResponse);
}

async function get(req: NextApiRequest, res: NextApiResponse) {
    const talkId: string = req.query.talkId as string;
    const attendeeUuid: string = req.query.attendeeUuid as string;

    if (!talkId) {
        const isUserLikedOne = await LikesService.getAttendeeAlreadyLikedOne(attendeeUuid);

        if (isUserLikedOne) {
            ApiResponse.build(res, StatusCodes.OK, 'Usuário já curtiu uma palestra');
        } else {
            ApiResponse.build(
                res,
                StatusCodes.NOT_FOUND,
                'Usuário ainda não curtiu nenhuma palestra'
            );
        }

        return;
    }

    const likesResponse = await LikesService.getLikes(talkId, attendeeUuid);

    ApiResponse.build(res, StatusCodes.OK, 'Done!', likesResponse);
}
