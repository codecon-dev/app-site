import { GetStaticProps, GetStaticPaths } from 'next';

import { getAllSponsors } from '@lib/cms-api';
import { Sponsor } from '@lib/types/all';
import SponsorLinks from '@components/patrocinadores/SponsorLinks';
import Page from '@components/_ui/Page';

type Props = {
    sponsor: Sponsor;
};

export default function SponsorPageLinks({ sponsor }: Props) {
    const meta = {
        title: `${sponsor.name} - Codecon`
    };

    return (
        <Page theme="digital" meta={meta} hideFooter hideNav noPadding>
            <SponsorLinks sponsor={sponsor} />
        </Page>
    );
}

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
    const slug = params?.slug;
    const sponsors = await getAllSponsors('digital');
    const sponsor = sponsors.find((s: Sponsor) => s.slug === slug) || null;

    if (!sponsor) {
        return {
            notFound: true
        };
    }

    return {
        props: {
            sponsor
        }
    };
};

export const getStaticPaths: GetStaticPaths = async () => {
    const sponsors = await getAllSponsors('digital');
    const slugs = sponsors.map((s: Sponsor) => ({ params: { slug: s.slug } }));

    return {
        paths: slugs,
        fallback: 'blocking'
    };
};