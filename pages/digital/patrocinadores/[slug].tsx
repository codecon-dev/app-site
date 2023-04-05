import { GetStaticProps, GetStaticPaths } from 'next';

import { getAllSponsors } from '@lib/cms-api';
import { Sponsor } from '@lib/types/all';

import Page from '@components/_ui/Page';
import SponsorPage from '@components/patrocinadores/SponsorPage';

type Props = {
    sponsor: Sponsor;
};

export default function Patrocinadores({ sponsor }: Props) {
    const meta = {
        title: `${sponsor.name} está patrocinando a Codecon Digital 2022`,
        image: `/api/get-image?title=${sponsor.slug}&type=sponsor`
    };

    return (
        <Page theme="digital" meta={meta}>
            <SponsorPage sponsor={sponsor} />
        </Page>
    );
}

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
    const slug = params?.slug;
    const sponsors = await getAllSponsors();
    const currentSponsor = sponsors.find((s: Sponsor) => s.slug === slug) || null;

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
    const onlySponsors = sponsors.filter(sponsor => sponsor.tier !== 'comunidade');
    const slugs = onlySponsors.map((s: Sponsor) => ({ params: { slug: s.slug } }));

    return {
        paths: slugs,
        fallback: false
    };
};
