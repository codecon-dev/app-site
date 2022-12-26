import Layout from '@components/2023/_ui/Layout';
import Page from '@components/_ui/Page';
import Hero from '@components/2023/tempSite/Hero';
import DetailsGrid from '@components/2023/tempSite/DetailsGrid';
import Contact from '@components/2023/tempSite/Contact';
import { SITE_NAME } from '@lib/constants';

export default function Index() {
    return (
        <Page>
            <Layout>
                <Hero />
                <DetailsGrid />
                <Contact />
            </Layout>
        </Page>
    );
}
