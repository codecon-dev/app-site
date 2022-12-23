import { GetStaticProps, GetStaticPaths } from 'next';

import { getAllSpeakers } from '@lib/cms-api';
import { Speaker } from '@lib/types/speakers';
import { ImageKind } from '@lib/types/all';
import { useRouter } from 'next/router';
import SpeakerImage from '@components/2022/quem-vai/SpeakerImage';

type Props = {
    speaker: Speaker;
};

type Query = {
    kind?: ImageKind;
};

export default function SpeakerImagePage({ speaker }: Props) {
    const { query } = useRouter();
    const { kind = 'default' }: Query = query;

    return <SpeakerImage speaker={speaker} kind={kind} />;
}

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
    const slug = params?.speaker;
    const speakers = await getAllSpeakers();
    const currentSpeaker = speakers.find((s: Speaker) => s.slug === slug) || null;

    if (!currentSpeaker) {
        return {
            notFound: true
        };
    }

    return {
        props: {
            speaker: currentSpeaker
        }
    };
};

export const getStaticPaths: GetStaticPaths = async () => {
    const speakers = await getAllSpeakers();
    const slugs = speakers.map((s: Speaker) => ({ params: { speaker: s.slug } }));

    return {
        paths: slugs,
        fallback: false
    };
};
