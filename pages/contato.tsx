import { GetStaticProps } from 'next';

import { getAllSponsors } from '@lib/cms-api';
import { Sponsor } from '@lib/types/all';

import Page from '@components/_ui/Page';
import Layout from '@components/_ui/Layout';
import Header from '@components/_ui/Header';
import Contact from '@components/contato/Contact';

type Props = {
    sponsors: Sponsor[];
};

export default function Contato({ sponsors }: Props) {
    const meta = {
        title: 'Contato - Codecon',
        description: 'Quer ser nosso patrocinador? Está com alguma dúvida?',
        image: '/images/2022/share-image.png'
    };

    return (
        <Page meta={meta}>
            <Layout sponsors={sponsors}>
                <Header
                    title="Entre em contato"
                    description="Quer ser nosso patrocinador? Está com alguma dúvida?"
                    image="/images/2022/contato/hero.svg"
                />
                <Contact />
            </Layout>
        </Page>
    );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
    const sponsors = await getAllSponsors();

    return {
        props: {
            sponsors
        }
    };
};
