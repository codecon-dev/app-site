import { NextApiRequest, NextApiResponse } from 'next';
import ApiKeyValidator from 'src/api/ApiKeyValidator';
import ApiResponse from 'src/api/ApiResponse';

export default async function TwillioCheckUser(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method != 'GET') {
            ApiResponse.build(res, StatusCodes.NOT_FOUND, 'Página não encontrada');
        }

        if (!ApiKeyValidator.validate(req, process.env.TWILLIO_API_KEY)) {
            ApiResponse.build(res, StatusCodes.UNAUTHORIZED, 'Unauthorized');
            return;
        }

        ApiResponse.build(res, StatusCodes.OK, 'OK');
    } catch (error) {
        console.error('TwillioRegister >> Ocorreu um erro inesperado', error);
        ApiResponse.build(res, StatusCodes.INTERNAL_SERVER_ERROR, 'Ocorreu um erro desconhecido');
    }
}
