import { NextApiRequest, NextApiResponse } from 'next';
import getScreenshot from '@lib/getScreenshot';
import { ImageKind } from '@lib/types/all';

type ImageParams = {
  name?: string;
  type?: 'sponsor' | 'speaker';
  kind?: ImageKind;
};

const baseUrl =
  process.env.VERCEL_ENV === 'development'
    ? 'http://localhost:3000'
    : `https://${process.env.VERCEL_URL}`;

const SPONSOR_PATH = `${baseUrl}/patrocinadores/image`;
const SPEAKER_PATH = `${baseUrl}/quem-vai/image`;
const IMAGE_CONFIG = {
  default: {
    width: 1200,
    height: 675
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
  const { name, type = 'sponsor', kind = 'default' }: ImageParams = req.query || {};

  if (!name) return res.status(404).send('Not Found');

  const isSponsor = type === 'sponsor';
  const path = isSponsor ? SPONSOR_PATH : SPEAKER_PATH;

  const screenshotParams = {
    ...IMAGE_CONFIG[kind],
    url: `${path}/${name}?type=${type}&kind=${kind}`
  };

  const file = await getScreenshot(screenshotParams);
  res.setHeader('Content-Type', `image/png`);
  res.setHeader(
    'Cache-Control',
    `public, immutable, no-transform, s-maxage=31536000, max-age=31536000`
  );
  res.statusCode = 200;
  res.end(file);
}
