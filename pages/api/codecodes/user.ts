import { NextApiRequest, NextApiResponse } from 'next';
import { StatusCodes } from 'http-status-codes';
import { getUser } from '@lib/codecodes-api';
import ApiResponse from 'src/api/ApiResponse';

export default async function CodeCodesUserController(req: NextApiRequest, res: NextApiResponse) {
    try {
        switch (req.method) {
            case 'GET':
                await getUserData(req, res);
                break;
            default:
                ApiResponse.build(res, StatusCodes.BAD_REQUEST, 'Método não permitido');
        }
    } catch (exception) {
        console.error('AuthController >> Ocorreu um erro inesperado', exception);
        ApiResponse.build(res, StatusCodes.INTERNAL_SERVER_ERROR, 'Ocorreu um erro desconhecido');
    }
}

async function getUserData(req: NextApiRequest, res: NextApiResponse) {
    const codecodesUser = await getUser(req.query.email as string);

    const statusCode: number =
        codecodesUser.status == 'success' ? StatusCodes.OK : StatusCodes.UNPROCESSABLE_ENTITY;

    ApiResponse.build(res, statusCode, codecodesUser.message, codecodesUser.data);
}
