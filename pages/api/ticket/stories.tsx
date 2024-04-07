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
                        width="1080"
                        height="1920"
                        src={`https://app.codecon.dev/images/ticket/ticket-stories.png`}
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
                            left: 202,
                            top: 761
                        }}
                    />
                    <div
                        style={{
                            color: 'white',
                            width: 450,
                            fontSize: 60,
                            fontFamily: 'BigShouldersText',
                            position: 'absolute',
                            left: 420,
                            top: 770
                        }}
                    >
                        {`${parsedParams.name.toUpperCase()}`}
                    </div>
                    <div
                        style={{
                            color: 'gray',
                            width: 450,
                            fontSize: 35,
                            position: 'absolute',
                            left: 420,
                            top: 840
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
                            left: 800,
                            top: 950,
                            transform: 'rotate(90deg)'
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
                        name: 'BigShouldersText',
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
