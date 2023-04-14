import { GetStaticProps, GetStaticPaths } from 'next';

import { getAllTalks, getAllSponsors } from '@lib/cms-api';
import { Sponsor, Talk } from '@lib/types/all';

import Page from '@components/_ui/Page';
import TalkPage from '@components/programacao/TalkPage';

type Props = {
    talk: Talk;
    sponsors: Sponsor[];
};

export default function QuemVai({ talk, sponsors }: Props) {
    const meta = {
        title: `${talk.title} - Codecon Digital`,
        image: '/images/share-image.png'
    };

    return (
        <Page theme="digital" meta={meta} sponsors={sponsors}>
            <TalkPage talk={talk} />
        </Page>
    );
}

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
    const slug = params?.slug;
    const sponsors = await getAllSponsors('digital');
    const talks = await getAllTalks('digital');
    const currentTalk = talks.find((t: Talk) => t.slug === slug) || null;

    if (!currentTalk) {
        return {
            notFound: true
        };
    }

    return {
        props: {
            talk: currentTalk,
            sponsors
        }
    };
};

export const getStaticPaths: GetStaticPaths = async () => {
    const talks = await getAllTalks('digital');
    const slugs = talks.map((t: Talk) => ({ params: { slug: t.slug } }));

    return {
        paths: slugs,
        fallback: false
    };
};
