import { GetStaticProps } from 'next';

import { getAllSponsors } from '@lib/cms-api';
import { Sponsor } from '@lib/types/all';

import Page from '@components/_ui/Page';
import Header from '@components/_ui/Header';
import SponsorsGrid from '@components/patrocinadores/SponsorsGrid';

type Props = {
    sponsors: Sponsor[];
};

export default function Programacao({ sponsors }: Props) {
    const meta = {
        title: 'Patrocinadores - Codecon Summit',
        description: 'Somos um evento que só é capaz graças ao patrocínio dessas empresas.'
    };

    return (
        <Page theme="summit" meta={meta}>
            <Header
                title={
                    <>
                        <span>Marcas</span> que <br />
                        apoiam a Codecon
                    </>
                }
                description="Somos um evento que só é capaz graças ao patrocínio dessas empresas. Clique nas marcas para saber mais sobre cada uma."
            />
            <SponsorsGrid sponsors={sponsors} />
        </Page>
    );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
    const sponsors = await getAllSponsors('summit');
    const onlySponsors = sponsors.filter(sponsor => sponsor.tier === 'patrocinador');

    return {
        props: {
            sponsors: onlySponsors
        }
    };
};
