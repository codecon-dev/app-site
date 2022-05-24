import { NextApiRequest, NextApiResponse } from 'next';
import { getRank } from '@lib/codecodes-api';

export default async function rank(request: NextApiRequest, response: NextApiResponse) {
  if (request.method !== 'GET') {
    return response.status(501).json({
      error: {
        code: 'method_unknown',
        message: 'This endpoint only responds to GET'
      }
    });
  }
  
  const result = await getRank()
  return response.status(200).json(result);
}