import Page from '@components/page';
import Layout from '@components/layout';

import { META_DESCRIPTION } from '@lib/constants';
import Header from '@components/header';
import MarathonForm from '@components/marathon-form';

export default function SponsorPage() {
  const meta = {
    title: `Maratona JetBrains - Codecon`,
    description: META_DESCRIPTION
  };

  return (
    <Page meta={meta}>
      <Layout hideNav hideFooter>
        <MarathonForm />
      </Layout>
    </Page>
  );
}
