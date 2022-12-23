import { GetStaticProps, GetStaticPaths } from 'next';

import { getAllWorkshops, getAllSponsors } from '@lib/cms-api';
import { Sponsor, Workshop } from '@lib/types/all';

import Layout from '@components/2022/_ui/Layout';
import Page from '@components/2022/_ui/Page';
import WorkshopPage from '@components/2022/workshops/WorkshopPage';

type Props = {
    workshop: Workshop;
    sponsors: Sponsor[];
};

export default function QuemVai({ workshop, sponsors }: Props) {
    const meta = {
        title: `${workshop.title} - Codecon Digital 2022`
    };

    return (
        <Page meta={meta}>
            <Layout sponsors={sponsors}>
                <WorkshopPage workshop={workshop} />
            </Layout>
        </Page>
    );
}

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
    const slug = params?.slug;
    const sponsors = await getAllSponsors();
    const workshops = await getAllWorkshops();
    const currentWorkshop = workshops.find((w: Workshop) => w.slug === slug) || null;

    if (!currentWorkshop) {
        return {
            notFound: true
        };
    }

    return {
        props: {
            workshop: currentWorkshop,
            sponsors
        }
    };
};

export const getStaticPaths: GetStaticPaths = async () => {
    const workshops = await getAllWorkshops();
    const slugs = workshops.map((w: Workshop) => ({ params: { slug: w.slug } }));

    return {
        paths: slugs,
        fallback: false
    };
};
