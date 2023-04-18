import { GetStaticProps } from 'next';

import { getAllSpeakers, getAllSponsors } from '@lib/cms-api';
import { Sponsor } from '@lib/types/all';
import { Speaker } from '@lib/types/speakers';

import Page from '@components/_ui/Page';
import HeroFeature from '@components/home/HeroFeature';
import Blocks from '@components/home/Blocks';
import Faq from '@components/home/Faq/Faq';

type Props = {
    speakers: Speaker[];
    sponsors: Sponsor[];
};

export default function Conf({ speakers, sponsors }: Props) {
    return (
        <Page theme="feature" noPadding>
            <HeroFeature />
            <Blocks>
                <Blocks.Title>
                    <span>Encode the present,</span> decode the future.
                </Blocks.Title>
                <Blocks.Block lg={3} sm={4} backgroundImage="/images/feature/foto-1.jpg" />
                <Blocks.Block lg={3} sm={4} backgroundImage="/images/feature/foto-2.jpg" />
                <Blocks.Block
                    lg={6}
                    sm={4}
                    backgroundImage="/images/feature/desconferencia.jpg"
                    title="Uma desconferência"
                    description="O evento será repleto de sessões e workshops onde todos podem trazer problemas que enfrentam e todos tem locais de fala."
                />
                <Blocks.Video code="fayuZX9FaF8" />
            </Blocks>
            {/* <Speakers speakers={speakers}>
                    Os principais nomes do mercado tech em <span>painéis</span>, <span>palestras</span>{' '}
                    e <span>fish bowls</span>
                </Speakers> */}
            <Faq />
        </Page>
    );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
    const speakers = await getAllSpeakers(5, 'feature');
    const sponsors = await getAllSponsors('feature');

    return {
        props: {
            speakers,
            sponsors
        }
    };
};
