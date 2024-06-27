import { GetStaticProps, GetStaticPaths } from 'next';

import { getAllTalks } from '@lib/cms-api';
import { Talk } from '@lib/types/all';

import PrivateArea from '@components/_ui/PrivateArea';
import { Meta } from '@components/_ui/Page/Page';
import TalkPage from '@components/programacao/TalkPage';

type Props = {
    talk: Talk;
};

export default function TalkPageComponent({ talk }: Props) {
    const meta: Meta = {
        title: `${talk.title} - Codecon Summit`
    };

    if (talk.shareImage) {
        meta.image = talk.shareImage.url;
    }

    return (
        <PrivateArea>
            <TalkPage talk={talk} />
        </PrivateArea>
    );
}

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
    const id = params?.id;
    const talks = await getAllTalks('summit');
    const currentTalk = talks.find((t: Talk) => t.id === id) || null;

    if (!currentTalk) {
        return {
            notFound: true
        };
    }

    return {
        props: {
            talk: currentTalk
        }
    };
};

export const getStaticPaths: GetStaticPaths = async () => {
    const talks = await getAllTalks('summit');
    const ids = talks.map((t: Talk) => ({ params: { id: t.id } }));

    return {
        paths: ids,
        fallback: false
    };
};
