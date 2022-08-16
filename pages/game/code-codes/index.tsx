import { GetStaticProps } from 'next';

import Page from '@components/_ui/Page';
import Layout from '@components/_ui/Layout';
import Ranking from '@components/code-codes/Ranking';

import { UserRank } from '@lib/types/codecodes';
import { RANKING_ENABLED } from '@lib/constants';
import { getRank } from '@lib/codecodes-api';

type Props = {
  rankUsers: UserRank[];
};

export default function CodeCodesRanking({ rankUsers }: Props) {
  const meta = {
    title: 'Ranking Code-codes - Codecon Digital 2022'
  };

  return (
    <Page meta={meta}>
      <Layout hideNav>
        <h1>Code-codes / Ranking</h1>
        {RANKING_ENABLED ? (
          <Ranking users={rankUsers} />
        ) : (
          <p style={{ textAlign: 'center', padding: 20 }}>
            O ranking está desabilitado. Vamos divulgar o resultado às 18h30 em nossas redes
            sociais.
            <br />
            <br /> Boa sorte! :)
          </p>
        )}
      </Layout>
    </Page>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const { data: rankUsers } = await getRank();

  return {
    props: {
      rankUsers: rankUsers || []
    },
    revalidate: 1
  };
};
