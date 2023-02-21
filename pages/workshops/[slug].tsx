import { GetStaticProps, GetStaticPaths } from 'next';

import { getAllWorkshops, getAllSponsors } from '@lib/cms-api';
import { Sponsor, Workshop } from '@lib/types/all';

import Layout from '@components/_ui/Layout';
import Page from '@components/_ui/Page';
import WorkshopPage from '@components/workshops/WorkshopPage';

type Props = {
    workshop: Workshop;
    sponsors: Sponsor[];
};

export default function QuemVai({ workshop, sponsors }: Props) {
    const meta = {
        title: `${workshop.title} - Codecon Digital 2022`,
        image: '/images/2022/share-image.png'
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
