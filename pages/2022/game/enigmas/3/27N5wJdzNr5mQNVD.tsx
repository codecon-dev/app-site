import Page from '@components/_ui/Page';
import Layout from '@components/2022/_ui/Layout';
import PrivateArea from '@components/2022/_ui/PrivateArea';
import DayThreePuzzle27 from '@components/2022/enigmas/DayThreePuzzle27';

export default function PuzzleTwentySeven() {
    const meta = {
        title: 'Enigmas - Codecon Digital 2022'
    };

    return (
        <Page meta={meta}>
            <Layout hideNav hideFooter>
                <PrivateArea>
                    <DayThreePuzzle27 />
                </PrivateArea>
            </Layout>
        </Page>
    );
}
