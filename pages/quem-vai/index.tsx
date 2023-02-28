import { GetStaticProps } from 'next';

import { getAllSpeakers, getAllSponsors } from '@lib/cms-api';
import { Sponsor } from '@lib/types/all';
import { Speaker } from '@lib/types/speakers';

import Header from '@components/_ui/Header';
import Page from '@components/_ui/Page';
import SpeakersGrid from '@components/quem-vai/SpeakersGrid';

type Props = {
    speakers: Speaker[];
    sponsors: Sponsor[];
};

export default function QuemVai({ speakers, sponsors }: Props) {
    const meta = {
        title: 'Quem vai - Codecon Digital 2022',
        description:
            'Pessoas que tem destaque na comunidade de tecnologia estarão participando de palestras, painéis e workshops.',
        image: '/images/share-image.png'
    };

    return (
        <Page theme="digital" meta={meta} sponsors={sponsors}>
            <Header
                title="Aprenda com os principais nomes da área tech"
                description="Pessoas que tem destaque na comunidade de tecnologia estarão
participando de palestras, painéis e workshops."
                image="/images/quem-vai/hero.svg"
            />
            <SpeakersGrid speakers={speakers} />
        </Page>
    );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
    const speakers = await getAllSpeakers();
    const sponsors = await getAllSponsors();

    return {
        props: {
            speakers,
            sponsors
        }
    };
};
