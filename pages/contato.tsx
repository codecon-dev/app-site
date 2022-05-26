import Page from '@components/_ui/Page';
import Layout from '@components/_ui/Layout';
import Contact from '@components/contato/Contact';

import { META_DESCRIPTION } from '@lib/constants';

export default function Palestras() {
  const meta = {
    title: 'Contato - Codecon',
    description: META_DESCRIPTION
  };

  return (
    <Page meta={meta}>
      <Layout>
        <Contact />
      </Layout>
    </Page>
  );
}
