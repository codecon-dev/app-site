import { GetStaticProps } from 'next';

import { useRouter } from 'next/router';
import { SkipNavContent } from '@reach/skip-nav';

import Layout from '@components/layout';
import Page from '@components/page';
import ConfContent from '@components/index';
import { META_DESCRIPTION } from '@lib/constants';

import { getAllSponsors, getPrincipalSpeakers } from '@lib/cms-api';
import { Sponsor, Speaker } from '@lib/types';

type Props = {
  sponsors: Sponsor[];
  speakers: Speaker[];
};

export default function Conf({ sponsors, speakers }: Props) {
  const { query } = useRouter();
  const meta = {
    title: 'Codecon - A comunidade que te faz crescer',
    description: META_DESCRIPTION
  };
  const ticketNumber = query.ticketNumber?.toString();

  return (
    <Page meta={meta} fullViewport>
      <Layout>
        <SkipNavContent />
        <ConfContent />
      </Layout>
    </Page>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const sponsors = await getAllSponsors();
  const speakers = await getPrincipalSpeakers();

  return {
    props: {
      sponsors,
      speakers
    }
  };
};
