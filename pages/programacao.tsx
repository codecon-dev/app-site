import { GetStaticProps } from 'next';

import { getAllWorkshops } from '@lib/cms-api';
import { Workshop } from '@lib/types/all';

import { META_DESCRIPTION } from '@lib/constants';
import Layout from '@components/_ui/Layout';
import Page from '@components/_ui/Page';
import Alert from '@components/_ui/Alert/Alert';
import Header from '@components/_ui/Header';

import Grid from '@components/programacao/Grid';
import Newsletter from '@components/programacao/Newsletter';

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
        <Header
          image="/images/programacao/hero.svg"
          title="Programação"
          description="Confira o que vem aí nos meetups e workshops da Codecon"
        />
        <Alert
          title="Seja avisado!"
          description="Receba um e-mail com a programação da semana dos meetups."
        >
          <Newsletter />
        </Alert>
        <Grid workshops={workshops} />
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
