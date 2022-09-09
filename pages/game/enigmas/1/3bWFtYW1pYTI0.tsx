import Page from '@components/_ui/Page';
import Layout from '@components/_ui/Layout';
import DayOnePuzzle3 from '@components/enigmas/DayOnePuzzle3';
import PrivateArea from '@components/_ui/PrivateArea';

export default function DayOnePuzzle3Page() {
  const meta = {
    title: 'Enigmas - Codecon Digital 2022'
  };

  return (
    <Page meta={meta}>
      <Layout hideNav hideFooter>
        <PrivateArea>
          <DayOnePuzzle3 />
        </PrivateArea>
      </Layout>
    </Page>
  );
}
