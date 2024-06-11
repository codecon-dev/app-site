/* eslint-disable @typescript-eslint/no-unsafe-call */
import type { NextApiRequest, NextApiResponse } from 'next'
import Cors from 'cors'
import { StatusCodes } from 'http-status-codes';
import axios from 'axios';

import ApiResponse from 'src/api/ApiResponse';

const cors = Cors({
  methods: ['POST'],
})

function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  fn: any
) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result)
      }

      return resolve(result)
    })
  })
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await runMiddleware(req, res, cors)

  try {
    if (req.method === 'OPTIONS') {
        ApiResponse.build(res, StatusCodes.OK, 'Success');
        return;
    }

    if (req.method != 'POST') {
        ApiResponse.build(res, StatusCodes.BAD_REQUEST, 'Método não permitido');
        return;
    }

    const params = req.body;

    void(await axios.post(
        process.env.CONVERTKIT_SUBSCRIBE_URL || '',
        {
            api_key: process.env.CONVERTKIT_API_KEY,
            email: params.email
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