import { GetStaticProps, GetStaticPaths } from 'next';

import { getAllSponsors } from '@lib/cms-api';
import { Sponsor } from '@lib/types/all';

import Layout from '@components/_ui/Layout';
import Page from '@components/_ui/Page';
import Hero from '@components/patrocinadores/Hero';
import About from '@components/patrocinadores/About';
import Infos from '@components/patrocinadores/Infos';

type Props = {
    sponsor: Sponsor;
};

export default function SponsorLP({ sponsor }: Props) {
    const meta = {
        title: `${sponsor.name} está patrocinando a Codecon Digital 2022`,
        image: `/api/get-image/${sponsor.slug}?type=sponsor`
    };

    return (
        <Page theme='digital' meta={meta}>
            <Layout hideNav>
                <Hero sponsor={sponsor} />
                <About />
                <Infos sponsor={sponsor} />
            </Layout>
        </Page>
    );
}

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
    const slug = params?.sponsor;
    const sponsors = await getAllSponsors();
    const currentSponsor = sponsors.find((s: Sponsor) => s.slug === slug);

    if (!currentSponsor) {
        return {
            notFound: true
        };
    }

    return {
        props: {
            sponsor: currentSponsor
        }
    };
};

export const getStaticPaths: GetStaticPaths = async () => {
    const sponsors = await getAllSponsors();
    const slugs = sponsors.map((s: Sponsor) => ({ params: { sponsor: s.slug } }));

    return {
        paths: slugs,
        fallback: false
    };
};
