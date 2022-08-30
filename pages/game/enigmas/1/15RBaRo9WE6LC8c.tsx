import Page from '@components/_ui/Page';
import Layout from '@components/_ui/Layout';
import DayOnePuzzleOne from '@components/enigmas/DayOnePuzzleOne';
import PrivateArea from '@components/_ui/PrivateArea';

export default function PuzzleOne() {
  const meta = {
    title: 'Enigmas - Codecon Digital 2022'
  };

  return (
    <Page meta={meta}>
      <Layout hideNav hideFooter>
        <PrivateArea>
          <DayOnePuzzleOne />
        </PrivateArea>
      </Layout>
    </Page>
  );
}
