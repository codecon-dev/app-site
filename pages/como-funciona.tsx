import { GetStaticProps } from 'next';

import { getAllSponsors } from '@lib/cms-api';
import { Sponsor } from '@lib/types/all';

import Page from '@components/_ui/Page';
import Layout from '@components/_ui/Layout';
import Header from '@components/_ui/Header';
import About from '@components/como-funciona/About';
import CodeCodes from '@components/como-funciona/CodeCodes';
import Games from '@components/como-funciona/Games';
import Cta from '@components/como-funciona/Cta';

type Props = {
    sponsors: Sponsor[];
};

export default function ComoFunciona({ sponsors }: Props) {
    const meta = {
        title: 'Como funciona - Codecon',
        description:
            'A Codecon é um festival de tecnologia online que reúne código, conteúdo, networking e muita diversão.',
        image: '/images/2022/share-image.png'
    };

    return (
        <Page meta={meta}>
            <Layout sponsors={sponsors}>
                <Header
                    title="É um evento, mas nem parece!"
                    description="A Codecon é um festival online de tecnologia que reúne código, conteúdo, networking e muita diversão."
                    image="/images/2022/como-funciona/hero.svg"
                />
                <About />
                <CodeCodes />
                <Games />
                <Cta />
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
