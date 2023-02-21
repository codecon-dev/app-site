import { GetStaticProps, GetStaticPaths } from 'next';

import { getAllSpeakers, getAllSponsors } from '@lib/cms-api';
import { Sponsor } from '@lib/types/all';
import { Speaker } from '@lib/types/speakers';

import Layout from '@components/_ui/Layout';
import Page from '@components/_ui/Page';
import { getSpeaker } from '@lib/cms-providers/dato';
import SpeakerPage from '@components/quem-vai/SpeakerPage';

type Props = {
    speaker: Speaker;
    sponsors: Sponsor[];
};

export default function QuemVai({ speaker, sponsors }: Props) {
    const meta = {
        title: `${speaker.name} estará na Codecon Digital 2022`,
        image: `/api/get-image/${speaker.slug}?type=speaker`,
        description: speaker.bio
    };

    return (
        <Page meta={meta}>
            <Layout sponsors={sponsors}>
                <SpeakerPage speaker={speaker} />
            </Layout>
        </Page>
    );
}

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
    const slug = params?.slug;
    const sponsors = await getAllSponsors();
    const speaker = await getSpeaker(`${slug}`);

    if (!speaker) {
        return {
            notFound: true
        };
    }

    return {
        props: {
            speaker,
            sponsors
        }
    };
};

export const getStaticPaths: GetStaticPaths = async () => {
    const speakers = await getAllSpeakers();
    const slugs = speakers.map(s => ({ params: { slug: s.slug } }));

    return {
        paths: slugs,
        fallback: false
    };
};
