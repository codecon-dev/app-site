import { GetStaticProps } from 'next';

import { getAllSponsors } from '@lib/cms-api';
import { Sponsor } from '@lib/types/all';

import Page from '@components/_ui/Page';
import Header from '@components/_ui/Header';
import Contact from '@components/contato/Contact';

type Props = {
    sponsors: Sponsor[];
};

export default function Contato({ sponsors }: Props) {
    const meta = {
        title: 'Contato - Codecon',
        description: 'Quer ser nosso patrocinador? Está com alguma dúvida?'
    };

    return (
        <Page theme="summit" meta={meta} sponsors={sponsors}>
            <Header
                title="Entre em contato"
                description="Quer ser nosso patrocinador? Está com alguma dúvida?"
            />
            <Contact />
        </Page>
    );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
    const sponsors = await getAllSponsors('summit');

    return {
        props: {
            sponsors
        }
    };
};
