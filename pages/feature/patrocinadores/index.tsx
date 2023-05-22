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
        title: 'Patrocinadores - Codecon Feature',
        description: 'Somos um evento que só é capaz graças ao patrocínio dessas empresas.'
    };

    return (
        <Page theme="feature" meta={meta}>
            <Header
                title={
                    <>
                        Nossos <span>patrocinadores</span>
                    </>
                }
            />
            <SponsorsGrid sponsors={sponsors} />
        </Page>
    );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
    const sponsors = await getAllSponsors('feature');
    const onlySponsors = sponsors.filter(sponsor => sponsor.tier === 'patrocinador');

    return {
        props: {
            sponsors: onlySponsors
        }
    };
};
