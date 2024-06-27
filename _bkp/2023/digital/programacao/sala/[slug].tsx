/* eslint-disable @typescript-eslint/require-await */
import { GetStaticProps, GetStaticPaths } from 'next';
import { useRouter } from 'next/router';

import Page from '@components/_ui/Page';
import RoomSchedule from '@components/programacao/RoomSchedule';

import { getAllTalks } from '@lib/cms-api';
import { Talk } from '@lib/types/all';

type Props = {
    talks: Talk[];
    roomName: string;
};

export default function TalkPage({ talks, roomName }: Props) {
    const meta = {
        title: `Programação - Codecon`
    };

    return (
        <Page theme="digital" meta={meta} hideNav hideFooter>
            <RoomSchedule talks={talks} />
        </Page>
    );
}

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
    const slug = params?.slug;
    const talks = await getAllTalks('digital');
    let roomName = '';

    switch (slug) {
        case '1':
            roomName = 'Sala 1';
            break;
        case '2':
            roomName = 'Sala 2';
            break;
        case 'onlyoffice':
            roomName = 'Stand da ONLYOFFICE';
            break;
        case 'linuxtips':
            roomName = 'Stand da LINUXtips';
            break;
    }

    const roomTalks = talks.filter(t => t.place?.toLowerCase() === roomName.toLowerCase());

    if (!roomTalks) {
        return {
            notFound: true
        };
    }

    return {
        props: {
            talks: roomTalks,
            roomName
        }
    };
};

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [
            { params: { slug: '1' } },
            { params: { slug: '2' } },
            { params: { slug: 'onlyoffice' } },
            { params: { slug: 'linuxtips' } }
        ],
        fallback: false
    };
};
