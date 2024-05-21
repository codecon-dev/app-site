import { NextApiRequest, NextApiResponse } from 'next';
import { StatusCodes } from 'http-status-codes';
import { newToken, getToken } from '@lib/codecodes-api';
import ApiResponse from 'src/api/ApiResponse';

import { CodecodesToken, CodecodesTokenResponse } from '@lib/types/codecodes';

export default async function CodeCodesTokenController(req: NextApiRequest, res: NextApiResponse) {
    try {
        switch (req.method) {
            case 'POST':
                await postToken(req, res);
                break;
            case 'GET':
                await getTokenData(req, res);
                break;
            default:
                ApiResponse.build(res, StatusCodes.BAD_REQUEST, 'Método não permitido');
        }
    } catch (exception) {
        console.error('AuthController >> Ocorreu um erro inesperado', exception);
        ApiResponse.build(res, StatusCodes.INTERNAL_SERVER_ERROR, 'Ocorreu um erro desconhecido');
    }
}

async function getTokenData(req: NextApiRequest, res: NextApiResponse) {
    const codecodesStatsResponse: CodecodesTokenResponse = await getToken(req.query.code as string);

    const statusCode: number =
        codecodesStatsResponse.status == 'success'
            ? StatusCodes.OK
            : StatusCodes.UNPROCESSABLE_ENTITY;

    ApiResponse.build(res, statusCode, codecodesStatsResponse.message, codecodesStatsResponse.data);
}

async function postToken(req: NextApiRequest, res: NextApiResponse) {
    const codecodesStatsResponse: CodecodesTokenResponse = await newToken(
        req.body as CodecodesToken
    );

    const statusCode: number =
        codecodesStatsResponse.status == 'success'
            ? StatusCodes.OK
            : StatusCodes.UNPROCESSABLE_ENTITY;

    ApiResponse.build(res, statusCode, codecodesStatsResponse.message, codecodesStatsResponse.data);
}
