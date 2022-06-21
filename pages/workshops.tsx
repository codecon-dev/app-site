import { GetStaticProps } from 'next';

import { getAllSponsors, getAllWorkshops } from '@lib/cms-api';
import { Sponsor, Workshop } from '@lib/types/all';

import Layout from '@components/_ui/Layout';
import Page from '@components/_ui/Page';
import Header from '@components/_ui/Header';
import Schedule from '@components/workshops/Schedule';

type Props = {
  workshops: Workshop[];
  sponsors: Sponsor[];
};

export default function Programacao({ workshops, sponsors }: Props) {
  const meta = {
    title: 'Workshops - Codecon Digital 2022'
  };

  return (
    <Page meta={meta}>
      <Layout sponsors={sponsors}>
        <Header
          image="/images/workshops/hero.svg"
          title="Workshops"
          description="Uma forma gratuita de pessoas da área aprenderem na prática sobre as principais tecnologias do mercado."
        />
        <Schedule workshops={workshops} />
      </Layout>
    </Page>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const workshops = await getAllWorkshops();
  const sponsors = await getAllSponsors();

  return {
    props: {
      workshops,
      sponsors
    }
  };
};
