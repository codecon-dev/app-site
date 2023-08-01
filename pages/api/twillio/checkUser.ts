import User from '@models/User';
import { StatusCodes } from 'http-status-codes';
import { NextApiRequest, NextApiResponse } from 'next';
import FormatHelper from 'src/FormatHelper';
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

        const mobilePhone = FormatHelper.removeNonNumeric(req.query.mobilePhone as string);
        if (!mobilePhone.length) {
            ApiResponse.build(
                res,
                StatusCodes.BAD_REQUEST,
                'Parâmetro [mobilePhone] deve conter apenas números'
            );
            return;
        }

        if (!FormatHelper.validatePhone(mobilePhone)) {
            ApiResponse.build(
                res,
                StatusCodes.UNPROCESSABLE_ENTITY,
                `Parâmetro [mobilePhone] deve conter 11 números [${mobilePhone}]`
            );
            return;
        }

        const user = await User.findByMobilePhone(mobilePhone);
        if (!user) {
            ApiResponse.build(res, StatusCodes.NOT_FOUND, 'Usuário não encontrado');
            return;
        }

        ApiResponse.build(res, StatusCodes.OK, 'OK');
    } catch (error) {
        console.error('TwillioCheckUser >> Ocorreu um erro inesperado', error);
        ApiResponse.build(res, StatusCodes.INTERNAL_SERVER_ERROR, 'Ocorreu um erro desconhecido');
    }
}
