import { CodecodesClaimResponse } from '@lib/types/codecodes';
import Attendee from '@models/Attendee';
import { StatusCodes } from 'http-status-codes';
import { NextApiRequest, NextApiResponse } from 'next';
import FormatHelper from 'src/FormatHelper';
import ApiKeyValidator from 'src/api/ApiKeyValidator';
import ApiResponse from 'src/api/ApiResponse';
import CodeCodesService from 'src/services/CodeCodesService';

export default async function twillioRedeemScanned(req: NextApiRequest, res: NextApiResponse) {
    if (req.method != 'POST') {
        ApiResponse.build(res, StatusCodes.NOT_FOUND, 'Página não encontrada');
    }

    const mobilePhone = FormatHelper.removeNonNumeric(req.body.mobilePhone as string);
    const attendee = await Attendee.findByMobilePhone(mobilePhone);
    if (!attendee) {
        ApiResponse.build(res, StatusCodes.UNPROCESSABLE_ENTITY, 'Usuário não encontrado');
        return;
    }

    const points: string = req.body.points;

    if (!points) {
        ApiResponse.build(
            res,
            StatusCodes.UNPROCESSABLE_ENTITY,
            'Obrigatório informar o número de pontos [points]'
        );
        return;
    }

    const codeToRedeem = `${process.env.CODECODES_SCANNED}${points}`;

    if (!codeToRedeem?.trim().length) {
        ApiResponse.build(
            res,
            StatusCodes.UNPROCESSABLE_ENTITY,
            'Obrigatório informar um código [code]'
        );
        return;
    }

    const codecodesResponse: CodecodesClaimResponse = await CodeCodesService.claimCode(
        attendee,
        codeToRedeem
    );

    if (codecodesResponse.status !== 'success') {
        console.error(
            'twillioRedeem >> Ocorreu um erro inesperado ao resgatar pontos',
            JSON.stringify(codecodesResponse)
        );
        ApiResponse.build(res, codecodesResponse.statusCode, codecodesResponse.message);
        return;
    }

    ApiResponse.build(res, StatusCodes.OK, codecodesResponse.message);
}
