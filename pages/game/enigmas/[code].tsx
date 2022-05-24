import { query } from '@lib/db';
import { GetStaticProps, GetStaticPaths } from 'next';

import Page from '@components/page';
import Layout from '@components/layout';

import { Puzzle, Sponsor } from '@lib/types';
import { META_DESCRIPTION } from '@lib/constants';
import Puzzles from '@components/puzzles';

type Props = {
  sponsors: Sponsor[];
  puzzle: Puzzle;
};

export default function SponsorPage({ puzzle }: Props) {
  const meta = {
    title: `Enigmas Codecon`,
    description: META_DESCRIPTION
  };

  return (
    <Page meta={meta}>
      <Layout hideNav hideFooter>
        <Puzzles puzzle={puzzle} />
      </Layout>
    </Page>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const code: string = params?.code.toString() || '';

  const puzzle = await query(
    `SELECT id, code
        FROM puzzles
        WHERE code = ?
        LIMIT 1`,
    [code]
  );

  if (!puzzle[0]?.id) {
    return {
      notFound: true
    };
  }

  return {
    props: {
      puzzle: { ...puzzle[0] }
    }
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true
  };
};
