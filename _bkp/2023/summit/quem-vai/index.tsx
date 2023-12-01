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
        title: 'Quem vai - Codecon Summit',
        description:
            'Pessoas que tem destaque na comunidade de tecnologia estarão participando de palestras, painéis e workshops.'
    };

    return (
        <Page theme="summit" meta={meta} sponsors={sponsors}>
            <Header
                title={
                    <>
                        Discuta o que há de mais moderno em <span>tecnologia</span>
                    </>
                }
                description={
                    <>
                        Um lugar onde você poderá aprender com quem é destaque nacional em
                        programação.
                    </>
                }
            />
            <SpeakersGrid speakers={speakers} />
        </Page>
    );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
    const speakers = await getAllSpeakers(100, 'summit');
    const sponsors = await getAllSponsors('summit');

    return {
        props: {
            speakers,
            sponsors
        }
    };
};
