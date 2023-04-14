/* eslint-disable @typescript-eslint/require-await */
import { GetStaticProps, GetStaticPaths } from 'next';
import { useRouter } from 'next/router';

import Page from '@components/_ui/Page';
import RoomSchedule from '@components/programacao/RoomSchedule';

import { getAllTalks } from '@lib/cms-api';
import { Talk } from '@lib/types/all';

type Props = {
    talks: Talk[];
};

export default function TalkPage({ talks }: Props) {
    const meta = {
        title: `Programação - Codecon`
    };

    const router = useRouter();
    const activeRouter = router.asPath.substring(router.asPath.lastIndexOf('/') + 1);

    return (
        <Page theme="digital" meta={meta} hideNav hideFooter>
            <RoomSchedule talks={talks} title={`Sala ${activeRouter}`} />
        </Page>
    );
}

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
    const slug = params?.slug;
    const talks = await getAllTalks('digital');
    const roomTalks = talks.filter(t => t.place?.toLowerCase() === `sala ${slug}`);

    if (!roomTalks) {
        return {
            notFound: true
        };
    }

    return {
        props: {
            talks: roomTalks
        }
    };
};

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [{ params: { slug: '1' } }, { params: { slug: '2' } }, { params: { slug: '3' } }],
        fallback: false
    };
};
