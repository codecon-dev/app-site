import { GetStaticProps } from 'next';

import { getAllSpeakers, getAllSponsors } from '@lib/cms-api';
import { Sponsor } from '@lib/types/all';
import { Speaker } from '@lib/types/speakers';

import Page from '@components/_ui/Page';
import HeroDigital from '@components/home/HeroDigital';
import Differentials from '@components/home/Differentials';
import About from '@components/home/About';
import ClaimCards from '@components/home/ClaimCards';
import Gather from '@components/home/Gather';
import Speakers from '@components/home/Speakers';
import Newsletter from '@components/home/Newsletter';
import Blocks from '@components/home/Blocks';
import Faq from '@components/home/Faq/Faq';

type Props = {
    speakers: Speaker[];
    sponsors: Sponsor[];
};

export default function Conf({ speakers, sponsors }: Props) {
    return (
        <Page theme="digital" noPadding>
            <HeroDigital />
            <Blocks>
                <Blocks.Title>
                    Um festival de tecnologia, <span>código</span> e inovação
                </Blocks.Title>
                <Blocks.Countdown
                    message="Tá chegando!"
                    local="Digital"
                    city="Gather Town"
                    initialDate={new Date('2023-06-22 00:00:00')}
                    finalDate={new Date('2023-06-23 00:00:00')}
                />
                <Blocks.Block
                    lg={6}
                    sm={4}
                    backgroundImage="/images/digital/cidade-gather.png"
                    backgroundImageMobile="/images/digital/cidade-gather-m.png"
                    title="Pela honra. Pelo código. Pelo café!"
                    description="Uma cidade virtual inspirada nas fantasias e  RPGs mais legais."
                />
                <Blocks.Block
                    lg={3}
                    sm={4}
                    backgroundImage="/images/digital/enigmas.png"
                    title="É um jogo?"
                    description="É no Gather Town, uma ferramenta que permite conexões reais."
                />
                <Blocks.Block
                    lg={3}
                    sm={4}
                    backgroundImage="/images/digital/network.png"
                    title="Networking"
                    description="Converse com outras devas, devs e patrocinadores."
                />
                {/* <Blocks.Video code="M51w8zk3QuQ" />*/}
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
    const speakers = await getAllSpeakers(5);
    const sponsors = await getAllSponsors();

    return {
        props: {
            speakers,
            sponsors
        }
    };
};
