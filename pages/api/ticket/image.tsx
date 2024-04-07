/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from '@vercel/og';
import { NextApiRequest } from 'next';

export const config = {
    runtime: 'edge'
};

const font = fetch(new URL('../../../public/fonts/BigShouldersText.ttf', import.meta.url)).then(
    res => res.arrayBuffer()
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
        const prefix = `0000000`.slice(numDigits);

        return new ImageResponse(
            (
                <div style={{ display: 'flex' }}>
                    <img
                        width="1200"
                        height="628"
                        src={`https://app.codecon.dev/images/ticket/ticket-share.jpg`}
                        style={{
                            position: 'relative'
                        }}
                    />
                    <img
                        alt="avatar"
                        width="162"
                        src={`https://github.com/${parsedParams.username}.png`}
                        style={{
                            borderRadius: 128,
                            position: 'absolute',
                            left: 145,
                            top: 128
                        }}
                    />
                    <div
                        style={{
                            color: 'white',
                            width: 500,
                            fontSize: 55,
                            fontFamily: 'BigShouldersText',
                            position: 'absolute',
                            left: 362,
                            top: 158
                        }}
                    >
                        {`${parsedParams.name.toUpperCase()}`}
                    </div>
                    <div
                        style={{
                            color: 'gray',
                            width: 500,
                            fontSize: 24,
                            position: 'absolute',
                            left: 362,
                            top: 220
                        }}
                    >
                        {`@${parsedParams.username}`}
                    </div>
                    <div
                        style={{
                            color: 'gray',
                            fontSize: 99,
                            fontFamily: 'BigShouldersText',
                            width: 500,
                            position: 'absolute',
                            left: 730,
                            top: 300,
                            transform: 'rotate(90deg)'
                        }}
                    >
                        {`# ${prefix}${parsedParams.ticketNumber}`}
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
