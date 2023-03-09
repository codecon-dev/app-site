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
import Blocks from '@components/_ui/Blocks/Blocks';

type Props = {
    speakers: Speaker[];
    sponsors: Sponsor[];
};

export default function Conf({ speakers, sponsors }: Props) {
    return (
        <Page theme="digital" noPadding sponsors={sponsors}>
            <HeroDigital />
            <Blocks>
                <Blocks.Block
                    lg={6}
                    backgroundImage="/images/gather.png"
                    title="Pela honra. Pelo código. Pelo café!"
                    description="Deployr é uma cidade virtual inspirada nas fantasias e  RPGs mais legais que você conhece."
                />
                <Blocks.Block
                    lg={3}
                    backgroundImage="/images/bg-digital.jpg"
                    title="É um jogo?"
                    description="Não. É no Gather Town, uma ferramenta que permite conexões reais."
                />
                <Blocks.Block
                    lg={3}
                    backgroundImage="/images/bg-digital.jpg"
                    title="Network"
                    description="Converse com outras devas, devs e patrocinadores."
                />
            </Blocks>
            <Differentials />
            <About />
            <ClaimCards />
            <Gather />
            <Speakers speakers={speakers} />
            <Newsletter />
        </Page>
    );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
    const speakers = await getAllSpeakers(8);
    const sponsors = await getAllSponsors();

    return {
        props: {
            speakers,
            sponsors
        }
    };
};
