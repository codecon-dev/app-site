import { GetStaticProps } from 'next';

import { getAllTalks, getAllSponsors } from '@lib/cms-api';
import { Sponsor, Talk } from '@lib/types/all';

import Layout from '@components/_ui/Layout';
import Page from '@components/_ui/Page';
import Header from '@components/_ui/Header';
import Schedule from '@components/programacao/Schedule';

type Props = {
  talks: Talk[];
  sponsors: Sponsor[];
};

export default function Programacao({ talks, sponsors }: Props) {
  const meta = {
    title: 'Programação - Codecon Digital 2022',
    description:
      'Programe-se! São 3 salas simultâneas, workshops e muitas atividades extras rolando nos três dias de evento.'
  };

  return (
    <Page meta={meta}>
      <Layout sponsors={sponsors}>
        <Header
          image="/images/programacao/hero.svg"
          title="Agenda"
          description="Programe-se! São 3 salas simultâneas, workshops
          e muitas atividades extras rolando nos três dias de evento."
        />
        <Schedule talks={talks} />
      </Layout>
    </Page>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const talks = await getAllTalks();
  const sponsors = await getAllSponsors();

  return {
    props: {
      talks,
      sponsors
    }
  };
};
