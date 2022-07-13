import { NextApiRequest, NextApiResponse } from 'next';
import getScreenshot from '@lib/getScreenshot';

interface ImageParams {
  name?: string;
  kind?:
    | 'sponsor'
    | 'sponsor-square'
    | 'sponsor-stories'
    | 'speaker'
    | 'speaker-square'
    | 'speaker-stories';
}

type ImageKind = 'default' | 'square' | 'stories';

const baseUrl =
  process.env.VERCEL_ENV === 'development' ? 'http://localhost:3000' : process.env.VERCEL_URL;
const SPONSOR_PATH = `${baseUrl}/patrocinadores/image`;
const SPEAKER_PATH = `${baseUrl}/quem-vai/image`;
const IMAGE_CONFIG = {
  default: {
    width: 2000,
    height: 1000
  },
  square: {
    width: 1500,
    height: 1500
  },
  stories: {
    width: 1080,
    height: 1920
  }
};

export default async function getImage(req: NextApiRequest, res: NextApiResponse) {
  const { name, kind = 'sponsor' }: ImageParams = req.query || {};

  if (!name) return res.status(404).send('Not Found');

  const isSponsor = kind?.includes('sponsor');
  const imageKind = (kind?.split('-')[1] as ImageKind) || 'default';
  const path = isSponsor ? SPONSOR_PATH : SPEAKER_PATH;

  const screenshotParams = { ...IMAGE_CONFIG[imageKind], url: `${path}/${name}?kind=${imageKind}` };

  const file = await getScreenshot(screenshotParams);
  res.setHeader('Content-Type', `image/png`);
  res.setHeader(
    'Cache-Control',
    `public, immutable, no-transform, s-maxage=31536000, max-age=31536000`
  );
  res.statusCode = 200;
  res.end(file);
}
