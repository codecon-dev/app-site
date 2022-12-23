import { GetStaticProps } from 'next';

import { getAllSponsors } from '@lib/cms-api';
import { Sponsor } from '@lib/types/all';

import Layout from '@components/2022/_ui/Layout';
import Page from '@components/_ui/Page';
import Header from '@components/2022/_ui/Header';
import SponsorsGrid from '@components/2022/patrocinadores/SponsorsGrid';

type Props = {
    sponsors: Sponsor[];
};

export default function Programacao({ sponsors }: Props) {
    const meta = {
        title: 'Patrocinadores - Codecon Digital 2022',
        description: 'Somos um evento que só é capaz graças ao patrocínio dessas empresas.'
    };

    return (
        <Page meta={meta}>
            <Layout>
                <Header
                    image="/images/2022/patrocinadores/hero.svg"
                    title="marcas que apoiam a gente"
                    description="Somos um evento que só é capaz graças ao patrocínio dessas empresas. Clique nas marcas para saber mais sobre cada uma."
                />
                <SponsorsGrid sponsors={sponsors} />
            </Layout>
        </Page>
    );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
    const sponsors = await getAllSponsors();
    const onlySponsors = sponsors.filter(sponsor => sponsor.tier !== 'comunidade');

    return {
        props: {
            sponsors: onlySponsors
        }
    };
};
