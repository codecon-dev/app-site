/* eslint-disable @typescript-eslint/no-unsafe-call */
import type { NextApiRequest, NextApiResponse } from 'next'
import Cors from 'cors'
import { StatusCodes } from 'http-status-codes';
import axios from 'axios';
import * as cheerio from 'cheerio';

import { formatDate } from '@lib/dates';
import ApiResponse from 'src/api/ApiResponse';

type Event = {
    title: string,
    url: string,
    start_date: string,
    start_time: string,
    img: string
};

type ApiReturn = {
    titulo: string,
    url: string,
    start_date: string,
    start_time: string,
}

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

    if (req.method != 'GET') {
        ApiResponse.build(res, StatusCodes.BAD_REQUEST, 'Método não permitido');
        return;
    }

    const allEvents:Event[] = [];

    await axios.get(
        'https://www.even3.com.br/api/v1/customclient/events',
        {
            headers: {
                'Authorization-App': `WP3C0759O5SMLGZ6OFX9ICO55IRMB`,
                'Authorization-Token': '3FE1lLVefb4='
            }
        }
    ).then((result) => {
        result.data.data.map(async ({ titulo, url, start_date, start_time }: ApiReturn) => {
            await axios.get(
                `https://eventos.codecon.dev/${url}`,
            ).then((html) => {
                const $ = cheerio.load(html.data as string);

                const newEvent:Event = {
                    title: titulo,
                    url,
                    start_date: formatDate(start_date, 'dd/MM'),
                    start_time,
                    img: $('.imagem-capa').attr('src') as string
                }
                
                allEvents.push(newEvent)
            })

            ApiResponse.build(res, StatusCodes.OK, 'Lista gerada com sucesso', allEvents);
        })
    })

  } catch (exception) {
      console.error('Even3.AllEvents >> Ocorreu um erro inesperado', exception);
      ApiResponse.build(res, StatusCodes.INTERNAL_SERVER_ERROR, 'Não foi possível recuperar os dados da Even3');
  }
}