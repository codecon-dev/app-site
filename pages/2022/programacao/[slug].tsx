import { GetStaticProps, GetStaticPaths } from 'next';

import { getAllTalks, getAllSponsors } from '@lib/cms-api';
import { Sponsor, Talk } from '@lib/types/all';

import Layout from '@components/2022/_ui/Layout';
import Page from '@components/2022/_ui/Page';
import TalkPage from '@components/2022/programacao/TalkPage';

type Props = {
    talk: Talk;
    sponsors: Sponsor[];
};

export default function QuemVai({ talk, sponsors }: Props) {
    const meta = {
        title: `${talk.title} - Codecon Digital 2022`
    };

    return (
        <Page meta={meta}>
            <Layout sponsors={sponsors}>
                <TalkPage talk={talk} />
            </Layout>
        </Page>
    );
}

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
    const slug = params?.slug;
    const sponsors = await getAllSponsors();
    const talks = await getAllTalks();
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
    const talks = await getAllTalks();
    const slugs = talks.map((t: Talk) => ({ params: { slug: t.slug } }));

    return {
        paths: slugs,
        fallback: false
    };
};
