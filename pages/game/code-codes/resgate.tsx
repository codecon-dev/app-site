import Page from '@components/_ui/Page';
import Layout from '@components/_ui/Layout';
import PrivateArea from '@components/_ui/PrivateArea';
import Claim from '@components/code-codes/Claim';

export default function CodeCodesResgate() {
  const meta = {
    title: 'Resgate Code-codes - Codecon Digital 2022'
  };

  return (
    <Page meta={meta}>
      <Layout hideNav>
        <h1>Code-codes / Ranking</h1>

        <PrivateArea>
          <Claim />
        </PrivateArea>
      </Layout>
    </Page>
  );
}
