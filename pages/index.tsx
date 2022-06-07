import Layout from '@components/_ui/Layout';
import Page from '@components/_ui/Page';
import Hero from '@components/home/Hero';
import About from '@components/home/About';
import ClaimCards from '@components/home/ClaimCards';

export default function Conf() {
  return (
    <Page>
      <Layout>
        <Hero />
        <About />
        <ClaimCards />
      </Layout>
    </Page>
  );
}
