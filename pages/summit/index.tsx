import { GetStaticProps } from 'next';

import { getAllSpeakers, getAllSponsors } from '@lib/cms-api';
import { Sponsor } from '@lib/types/all';
import { Speaker } from '@lib/types/speakers';

import Page from '@components/_ui/Page';
import HeroSummit from '@components/home/HeroSummit';
import Blocks from '@components/home/Blocks';
import Faq from '@components/home/Faq/Faq';

type Props = {
    speakers: Speaker[];
    sponsors: Sponsor[];
};

export default function Conf({ speakers, sponsors }: Props) {
    return (
        <Page theme="summit" noPadding>
            <HeroSummit />
            <Blocks>
                <Blocks.Title>
                    <span>Do it for you.</span> Do it by code.
                </Blocks.Title>
                <Blocks.Countdown
                    message="Garanta sua vaga!"
                    local="Campus Park"
                    city="Joinville, SC"
                    initialDate={new Date('2023-08-26 00:00:00')}
                />
                <Blocks.Block
                    lg={6}
                    sm={6}
                    backgroundImage="/images/summit/futuro-programado.jpg"
                    title="Onde o futuro será programado"
                    description="O maior evento para pessoas programadoras de Santa Catarina, com grandes nomes nacionais."
                />
                <Blocks.Block
                    lg={6}
                    sm={6}
                    backgroundImage="/images/summit/discussoes-reais.jpg"
                    title="Discussões reais"
                    description="Nossa curadoria busca temas mais atuais em tecnologias, soft skills e design de software."
                />
                <Blocks.Block lg={3} sm={4} backgroundImage="/images/summit/foto-1.jpg" />
                <Blocks.Block
                    lg={6}
                    sm={4}
                    backgroundImage="/images/summit/campus-park.jpg"
                    title="Campus park Unisociesc"
                    description="Um espaço que respira inovação e tecnologia."
                />
                <Blocks.Block lg={3} sm={4} backgroundImage="/images/summit/foto-2.jpg" />
                <Blocks.Video code="NCuwtYQjsjs" />
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
