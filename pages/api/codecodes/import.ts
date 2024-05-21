import { NextApiRequest, NextApiResponse } from 'next';
import { IncomingForm } from 'formidable';
import fs from 'fs';

import { StatusCodes } from 'http-status-codes';
import { importTokens } from '@lib/codecodes-api';
import ApiResponse from 'src/api/ApiResponse';
import { CodecodesTokenResponse } from '@lib/types/codecodes';
import { readAndMapCsvTokens } from '@lib/utils';

export const config = {
    api: {
        bodyParser: false
    }
};

export default async function CodeCodesTokenImportController(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        switch (req.method) {
            case 'POST':
                await postImport(req, res);
                break;
            default:
                ApiResponse.build(res, StatusCodes.BAD_REQUEST, 'Método não permitido');
        }
    } catch (exception) {
        console.error('AuthController >> Ocorreu um erro inesperado', exception);
        ApiResponse.build(res, StatusCodes.INTERNAL_SERVER_ERROR, 'Ocorreu um erro desconhecido');
    }
}

async function postImport(req: NextApiRequest, res: NextApiResponse) {
    const fData = await new Promise<{ fields: any; files: any }>((resolve, reject) => {
        const form = new IncomingForm({
            multiples: false
        });
        form.parse(req, (err, fields, files) => {
            if (err) return reject(err);
            resolve({ fields, files });
        });
    });

    const csvFile = fData.files.csv;
    const csvFilePath = csvFile[0].filepath as string;
    const tokens = await readAndMapCsvTokens(csvFilePath);

    const codecodesStatsResponse: CodecodesTokenResponse = await importTokens(tokens);

    const statusCode: number =
        codecodesStatsResponse.status == 'success'
            ? StatusCodes.OK
            : StatusCodes.UNPROCESSABLE_ENTITY;

    ApiResponse.build(res, statusCode, codecodesStatsResponse.message, codecodesStatsResponse.data);

    return;
}
