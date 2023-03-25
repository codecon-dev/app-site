import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { createTicketIfNotExists } from "@lib/cms-api";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    switch (req.method) {
      case 'GET':
        await get(req, res)
        break
      default:
        throw { status: 501, message: 'Verbo HTTP não implementado' }
    }
  } catch (exception: any) {
    res.status(Number(exception.status) || 400).json({
      message: exception.message || exception
    })
  }
}

async function get(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const symplaData = await axios.get(`${process.env.SYMPLA_API_URL}/events/${process.env.SYMPLA_EVENT_ID}/orders/${id}/participants`, {
    headers: {
      's_token': process.env.SYMPLA_API_KEY
    }
  });

  if (!symplaData.data.data[0]) throw { status: 404, message: 'Pedido não encontrado' }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  await createTicketIfNotExists(`${id}`, symplaData.data.data);

  res.status(200).json({ success: true })
}