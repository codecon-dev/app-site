import { GetStaticProps } from 'next';

import Page from '@components/page';
import Layout from '@components/layout';

import { PuzzleUser } from '@lib/types';
import { META_DESCRIPTION } from '@lib/constants';
import PuzzlesRanking from '@components/puzzles-ranking';
import Header from '@components/header';
import { getPuzzleRanking } from '@lib/puzzles-api';

type Props = {
  users: PuzzleUser[];
};

export default function SponsorPage({ users }: Props) {
  const meta = {
    title: `Enigmas - Codecon`,
    description: META_DESCRIPTION
  };

  return (
    <Page meta={meta}>
      <Layout hideNav hideFooter>
        <Header hero="Enigmas do Asaas" description="Ranking dos 10 primeiros" />
        <PuzzlesRanking users={users} />
      </Layout>
    </Page>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const ranking = await getPuzzleRanking();

  return {
    props: {
      users: ranking
    },
    revalidate: 1,
  };
};
