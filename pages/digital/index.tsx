import { GetStaticProps } from 'next';

import { getAllSpeakers, getAllSponsors } from '@lib/cms-api';
import { Sponsor } from '@lib/types/all';
import { Speaker } from '@lib/types/speakers';

import Page from '@components/_ui/Page';
import HeroDigital from '@components/home/HeroDigital';
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
                    <span>Adventures</span> in the world of development
                </Blocks.Title>
                <Blocks.Block
                    lg={6}
                    sm={4}
                    backgroundImage="/images/digital/cidade-gather.png"
                    backgroundImageMobile="/images/digital/cidade-gather-m.png"
                    title="Pela honra. Pelo código. Pelo café!"
                    description="Uma cidade virtual inspirada nas fantasias e  RPGs mais legais que você conhece."
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
                <Blocks.Video code="EiUiLA2gV0I" />
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
    const speakers = await getAllSpeakers(5, 'digital');
    const sponsors = await getAllSponsors('digital');

    return {
        props: {
            speakers,
            sponsors
        }
    };
};
