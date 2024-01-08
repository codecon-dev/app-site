import { NextApiRequest, NextApiResponse } from 'next';
import { StatusCodes } from 'http-status-codes';
import NextCors from 'nextjs-cors';
import axios from 'axios';

import ApiResponse from 'src/api/ApiResponse';

export default async function Subscribe(
    req: NextApiRequest,
    res: NextApiResponse
): Promise<void> {
    try {
        if (req.method != 'POST') {
            ApiResponse.build(res, StatusCodes.BAD_REQUEST, 'Método não permitido');
            return;
        }

        await NextCors(req, res, {
            // Options
            methods: ['POST'],
            origin: '*',
            optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
        });

        const params = req.body;

        void(await axios.post(
            process.env.NEWSLETTER_AUDIENCE_RESEND || '',
            {
                email: params.email
            },
            {
                headers: {
                    'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
                    'Content-Type': 'application/json'
                }
            }
        ));

        void (await axios.post(
            process.env.DISCORD_WEBHOOK || '',
            {
                content: `Novo inscrito na newsletter: ${params.email}`
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        ));

        ApiResponse.build(res, StatusCodes.OK, 'Inscrito com sucesso!');
    } catch (exception) {
        console.error('Newsletter.Subscribe >> Ocorreu um erro inesperado', exception);
        ApiResponse.build(res, StatusCodes.INTERNAL_SERVER_ERROR, 'Não foi possível inscrever o e-mail');
    }
}
