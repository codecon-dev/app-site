import { NextApiRequest, NextApiResponse } from 'next';
import validator from 'validator';
import { query } from '@lib/db';

type Reactions = {
  thumbsUp: number,
  happy: number,
  party: number,
  neutral: number,
  heart: number,
  rocket: number
};

type ErrorResponse = {
  error: {
    code: string;
    message: string;
  };
};

export default async function getReactions(
  req: NextApiRequest,
  res: NextApiResponse<Reactions | ErrorResponse>
) {
  if (req.method !== 'POST') {
    return res.status(501).json({
      error: {
        code: 'method_unknown',
        message: 'This endpoint only responds to POST'
      }
    });
  }

  const id: string = ((req.body as string) || '');
  
  if (!validator.isNumeric(id)) {
    return res.status(400).json({
      error: {
        code: 'bad_id',
        message: 'Invalid ID'
      }
    });
  }

  const statusCode = 200;
  let thumbsUp = 0;
  let happy = 0;
  let party = 0;
  let neutral = 0;
  let heart = 0;
  let rocket = 0;

  const reactionData: [Reactions] = await query(
    `
    SELECT 
      thumbsUp,
      happy,
      party,
      neutral,
      heart,
      rocket
    FROM reactions
    WHERE id = ?
    `,
    [id]
  );

  if (reactionData[0]) {
    ({ thumbsUp, happy, party, neutral, heart, rocket } = reactionData[0]);
  }

  return res.status(statusCode).json({
    thumbsUp,
    happy,
    party,
    neutral,
    heart,
    rocket
  });
}
