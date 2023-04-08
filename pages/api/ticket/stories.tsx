/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from '@vercel/og';
import { NextApiRequest } from 'next';

export const config = {
    runtime: 'edge'
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
                        width="1080"
                        height="1920"
                        src={`https://codecon.dev/images/ticket/${parsedParams.event}-stories.jpg`}
                        style={{
                            position: 'relative'
                        }}
                    />
                    <img
                        alt="avatar"
                        width="115"
                        src={`https://github.com/${parsedParams.username}.png`}
                        style={{
                            borderRadius: 128,
                            position: 'absolute',
                            left: 320,
                            top: 568
                        }}
                    />
                    <div
                        style={{
                            color: 'white',
                            width: 450,
                            fontSize: 48,
                            fontFamily: 'SpaceGrotesk',
                            position: 'absolute',
                            left: 320,
                            top: 706
                        }}
                    >
                        {`${parsedParams.name}`}
                    </div>
                    <div
                        style={{
                            color: 'gray',
                            width: 450,
                            fontSize: 35,
                            position: 'absolute',
                            left: 320,
                            top: 770
                        }}
                    >
                        {`@${parsedParams.username}`}
                    </div>
                    <div
                        style={{
                            color: 'black',
                            fontSize: 76,
                            fontFamily: 'SpaceGrotesk',
                            width: 500,
                            position: 'absolute',
                            left: 370,
                            top: 1445
                        }}
                    >
                        {`№ ${prefix}${parsedParams.ticketNumber}`}
                    </div>
                </div>
            ),
            {
                width: 1080,
                height: 1920,
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
