import { GetStaticProps } from 'next';

import { getAllSpeakers, getAllSponsors } from '@lib/cms-api';
import { Sponsor } from '@lib/types/all';
import { Speaker } from '@lib/types/speakers';

import Layout from '@components/2022/_ui/Layout';
import Page from '@components/2022/_ui/Page';
import Hero from '@components/2022/home/Hero';
import Differentials from '@components/2022/home/Differentials';
import About from '@components/2022/home/About';
import ClaimCards from '@components/2022/home/ClaimCards';
import Gather from '@components/2022/home/Gather';
import Speakers from '@components/2022/home/Speakers';
import Newsletter from '@components/2022/home/Newsletter';

type Props = {
    speakers: Speaker[];
    sponsors: Sponsor[];
};

export default function Conf({ speakers, sponsors }: Props) {
    return (
        <Page>
            <Layout sponsors={sponsors}>
                <Hero />
                <Differentials />
                <About />
                <ClaimCards />
                <Gather />
                <Speakers speakers={speakers} />
                <Newsletter />
            </Layout>
        </Page>
    );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
    const speakers = await getAllSpeakers(8);
    const sponsors = await getAllSponsors();

    return {
        props: {
            speakers,
            sponsors
        }
    };
};
