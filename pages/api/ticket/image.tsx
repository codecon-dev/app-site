/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from '@vercel/og';
import { NextApiRequest } from 'next';

export const config = {
    runtime: 'experimental-edge'
};

const font = fetch(new URL('../../../public/fonts/SpaceGrotesk.ttf', import.meta.url)).then(res =>
    res.arrayBuffer()
);

type Params = {
    name: string;
    username: string;
    ticketNumber: number;
    event: string;
};

export default async function handler(req: NextApiRequest) {
    try {
        const { searchParams } = new URL(req.url || '');
        const fontData = await font;

        const params = searchParams.get('params');

        if (!params) {
            throw Error('Parametros inválidos');
        }

        const parsedParams: Params = JSON.parse(atob(params));

        const numDigits = parsedParams.ticketNumber.toString().length;
        const prefix = `00000`.slice(numDigits);

        return new ImageResponse(
            (
                <div style={{ display: 'flex' }}>
                    <img
                        width="1200"
                        height="628"
                        src={`https://codecon.dev/images/ticket/${parsedParams.event}-ticket-share.jpg`}
                        style={{
                            position: 'relative'
                        }}
                    />
                    <img
                        alt="avatar"
                        width="80"
                        src={`https://github.com/${parsedParams.username}.png`}
                        style={{
                            borderRadius: 128,
                            position: 'absolute',
                            left: 240,
                            top: 180
                        }}
                    />
                    <div
                        style={{
                            color: 'white',
                            width: 500,
                            fontSize: 37,
                            fontFamily: 'SpaceGrotesk',
                            position: 'absolute',
                            left: 342,
                            top: 178
                        }}
                    >
                        {`${parsedParams.name}`}
                    </div>
                    <div
                        style={{
                            color: 'gray',
                            width: 500,
                            fontSize: 24,
                            position: 'absolute',
                            left: 342,
                            top: 220
                        }}
                    >
                        {`@${parsedParams.username}`}
                    </div>
                    <div
                        style={{
                            color: 'black',
                            fontSize: 47,
                            fontFamily: 'SpaceGrotesk',
                            width: 500,
                            position: 'absolute',
                            left: 650,
                            top: 150,
                            transform: 'rotate(-90deg)'
                        }}
                    >
                        {`№ ${prefix}${parsedParams.ticketNumber}`}
                    </div>
                </div>
            ),
            {
                width: 1200,
                height: 628,
                fonts: [
                    {
                        name: 'SpaceGrotesk',
                        data: fontData,
                        style: 'normal'
                    }
                ]
            }
        );
    } catch (e: any) {
        console.log(`${e.message}`);
        return new Response(`Failed to generate the image`, {
            status: 500
        });
    }
}
