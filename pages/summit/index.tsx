import { GetStaticProps } from 'next';

import { getAllSpeakers, getAllSponsors } from '@lib/cms-api';
import { Sponsor } from '@lib/types/all';
import { Speaker } from '@lib/types/speakers';

import Page from '@components/_ui/Page';
import HeroSummit from '@components/home/HeroSummit';
import Blocks from '@components/home/Blocks';
import Faq from '@components/home/Faq/Faq';
import SpeakersGrid from '@components/quem-vai/SpeakersGrid';
import { Column } from '@components/_ui/Grid';

type Props = {
    speakers: Speaker[];
    sponsors: Sponsor[];
};

export default function Conf({ speakers, sponsors }: Props) {
    return (
        <Page theme="summit" noPadding sponsors={sponsors}>
            <HeroSummit />
            <Blocks>
                <Blocks.Title>
                    <span>Galeria de fotos</span>
                </Blocks.Title>
                <Column lg={12}>
                    <a href="https://fotos-summit.codecon.dev/" target='_blank'><img width="100%" src="https://fotos-summit.codecon.dev/og-image.png" /></a>
                </Column>
                <Blocks.Title>
                    <br/><br />
                    <span>Aftermovie</span>
                </Blocks.Title>
                <Blocks.Video code="Akyhkv5msdA" />
            </Blocks>
        </Page>
    );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
    const speakers = await getAllSpeakers(5, 'summit');
    const sponsors = await getAllSponsors('summit');

    return {
        props: {
            speakers,
            sponsors
        }
    };
};
