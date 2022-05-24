import { GetStaticProps } from 'next';

import { SkipNavContent } from '@reach/skip-nav';

import Layout from '@components/layout';
import Page from '@components/page';
import { META_DESCRIPTION } from '@lib/constants';

import { getAllWorkshops } from '@lib/cms-api';
import { Workshop } from '@lib/types';

import Header from '@components/header';
import Hero from '@components/programacao-metaverso/hero';
import Calendar from '@components/programacao-metaverso/calendar';
import WorkshopsGrid from '@components/workshops-grid';
import Newsletter from '@components/programacao-metaverso/newsletter';
import Alert from '@components/_ui/Alert/Alert';

type Props = {
  workshops: Workshop[];
};

export default function Programacao({ workshops }: Props) {
  const meta = {
    title: 'Programação - Meetups Codecon',
    description: META_DESCRIPTION
  };

  return (
    <Page meta={meta} fullViewport>
      <Layout>
        <SkipNavContent />
        <Header
          hero="Programação"
          description="Confira o que vem aí nos meetups e workshops da Codecon"
        />
        <Alert
          title="Seja avisado!"
          description="Receba um e-mail com a programação da semana dos meetups."
        >
          <Newsletter />
        </Alert>
        <WorkshopsGrid workshops={workshops} />
      </Layout>
    </Page>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const workshops = await getAllWorkshops();

  return {
    props: {
      workshops
    }
  };
};
