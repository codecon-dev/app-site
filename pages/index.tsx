import Page from '@components/_ui/Page';
import Hero from '@components/temp-site/Hero';
import DetailsGrid from '@components/temp-site/DetailsGrid';
import Contact from '@components/temp-site/Contact';

export default function Index() {
    return (
        <Page>
            <Hero />
            <DetailsGrid />
            <Contact />
        </Page>
    );
}
