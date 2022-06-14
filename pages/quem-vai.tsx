import Header from '@components/_ui/Header';
import Layout from '@components/_ui/Layout';
import Page from '@components/_ui/Page';

export default function QuemVai() {
  return (
    <Page>
      <Layout>
        <Header
          title="Aprenda com os principais nomes da área tech"
          description="São 24 pessoas que tem detaque na comunidade de tecnologia
participando de palestras, painéis e workshops."
          image="/images/quem-vai/hero.svg"
        />
      </Layout>
    </Page>
  );
}
