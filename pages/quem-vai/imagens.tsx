import { GetStaticProps } from 'next';

import { getAllSpeakers, getAllSponsors } from '@lib/cms-api';
import { Sponsor } from '@lib/types/all';
import { Speaker } from '@lib/types/speakers';

import Header from '@components/_ui/Header';
import Layout from '@components/_ui/Layout';
import Page from '@components/_ui/Page';
import SpeakersImages from '@components/quem-vai/SpeakersImages';

type Props = {
  speakers: Speaker[];
  sponsors: Sponsor[];
};

export default function QuemVai({ speakers, sponsors }: Props) {
  const meta = {
    title: 'Quem vai - Codecon Digital 2022',
    description:
      'Pessoas que tem detaque na comunidade de tecnologia estarão participando de palestras, painéis e workshops.'
  };

  return (
    <Page meta={meta}>
      <Layout sponsors={sponsors}>
        <SpeakersImages speakers={speakers} />
      </Layout>
    </Page>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const speakers = await getAllSpeakers();
  const sponsors = await getAllSponsors();

  return {
    props: {
      speakers,
      sponsors
    }
  };
};
