import { GetStaticProps, GetStaticPaths } from 'next';

import { getAllSpeakers, getAllSponsors } from '@lib/cms-api';
import { Sponsor } from '@lib/types/all';
import { Speaker } from '@lib/types/speakers';

import Page from '@components/_ui/Page';
import { Meta } from '@components/_ui/Page/Page';
import { getSpeaker } from '@lib/cms-providers/dato';
import SpeakerPage from '@components/quem-vai/SpeakerPage';

type Props = {
    speaker: Speaker;
    sponsors: Sponsor[];
};

export default function QuemVai({ speaker, sponsors }: Props) {
    const meta: Meta = {
        title: `${speaker.name} estará na Codecon Digital`,
        description: speaker.bio
    };

    if (speaker.shareImage) {
        meta.image = speaker.shareImage.url;
    }

    return (
        <Page theme="digital" meta={meta} sponsors={sponsors}>
            <SpeakerPage speaker={speaker} />
        </Page>
    );
}

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
    const slug = params?.slug;
    const sponsors = await getAllSponsors('digital');
    const speaker = await getSpeaker(`${slug}`, 'digital');

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
    const speakers = await getAllSpeakers(100, 'digital');
    const slugs = speakers.map(s => ({ params: { slug: s.slug } }));

    return {
        paths: slugs,
        fallback: false
    };
};
