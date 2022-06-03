import Layout from '@components/_ui/Layout';
import Page from '@components/_ui/Page';
import Hero from '@components/home/Hero';
import About from '@components/home/About';

export default function Conf() {
  return (
    <Page>
      <Layout>
        <Hero />
        <About />
      </Layout>
    </Page>
  );
}
