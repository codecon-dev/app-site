import { NextApiRequest, NextApiResponse } from 'next';
import { StatusCodes } from 'http-status-codes';
import { getStats } from '@lib/codecodes-api';
import ApiResponse from 'src/api/ApiResponse';

import { CodecodesStatsResponse } from '@lib/types/codecodes';

export default async function CodeCodesStatsController(req: NextApiRequest, res: NextApiResponse) {
    try {
        switch (req.method) {
            case 'GET':
                await getCodeCodesStats(req, res);
                break;
            default:
                ApiResponse.build(res, StatusCodes.BAD_REQUEST, 'Método não permitido');
        }
    } catch (exception) {
        console.error('AuthController >> Ocorreu um erro inesperado', exception);
        ApiResponse.build(res, StatusCodes.INTERNAL_SERVER_ERROR, 'Ocorreu um erro desconhecido');
    }
}

async function getCodeCodesStats(req: NextApiRequest, res: NextApiResponse) {
    const codecodesStatsResponse: CodecodesStatsResponse = await getStats();

    const statusCode: number =
        codecodesStatsResponse.status == 'success'
            ? StatusCodes.OK
            : StatusCodes.UNPROCESSABLE_ENTITY;

    ApiResponse.build(res, statusCode, codecodesStatsResponse.message, codecodesStatsResponse.data);
}
