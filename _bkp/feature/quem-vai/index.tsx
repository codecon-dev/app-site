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
        title: 'Quem vai - Codecon Feature',
        description:
            'Pessoas que tem destaque na comunidade de tecnologia estarão participando de palestras, painéis e workshops.'
    };

    return (
        <Page theme="feature" meta={meta} sponsors={sponsors}>
            <Header
                title={
                    <>
                        Keep getting <span>better</span>.
                    </>
                }
                description={
                    <>
                        Tome as decisões certas descobrindo como os desenvolvedores sênior estão
                        adotando as principais tendências de mercado.
                    </>
                }
            />
            <SpeakersGrid speakers={speakers} />
        </Page>
    );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
    const speakers = await getAllSpeakers(100, 'feature');
    const sponsors = await getAllSponsors('feature');

    return {
        props: {
            speakers,
            sponsors
        }
    };
};
