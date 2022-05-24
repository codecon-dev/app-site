import { GetStaticProps } from 'next';

import Page from '@components/page';
import Layout from '@components/layout';
import Header from '@components/header';
import Contact from '@components/contact';

import { getAllSponsors } from '@lib/cms-api';
import { Sponsor } from '@lib/types';
import { META_DESCRIPTION } from '@lib/constants';

type Props = {
  sponsors: Sponsor[];
};

export default function Palestras({ sponsors }: Props) {
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

export const getStaticProps: GetStaticProps<Props> = async () => {
  const sponsors = await getAllSponsors();

  return {
    props: {
      sponsors
    }
  };
};
