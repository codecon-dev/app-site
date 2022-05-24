import { NextApiRequest, NextApiResponse } from 'next';
import { claimCodecodesApiToken } from '@lib/codecodes-api';

export default async function claim(request: NextApiRequest, response: NextApiResponse) {
  if (request.method !== 'POST') {
    return response.status(501).json({
      error: {
        code: 'method_unknown',
        message: 'This endpoint only responds to POST'
      }
    });
  }
  
  const { name, email, code } = JSON.parse(request.body)

  if (!name || !email || !code ) {
    return response.status(400).json({
      error: {
        code: 'missing_data',
        message: 'Missing name, email or code'
      }
    })
  }

  const result = await claimCodecodesApiToken({ name, email, code })
  return response.status(200).json(result);
}