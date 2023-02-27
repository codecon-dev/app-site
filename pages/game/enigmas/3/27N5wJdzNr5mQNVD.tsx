import Page from '@components/_ui/Page';
import Layout from '@components/_ui/Layout';
import PrivateArea from '@components/_ui/PrivateArea';
import DayThreePuzzle27 from '@components/enigmas/DayThreePuzzle27';

export default function PuzzleTwentySeven() {
    const meta = {
        title: 'Enigmas - Codecon Digital 2022'
    };

    return (
        <Page theme='digital' meta={meta}>
            <Layout hideNav hideFooter>
                <PrivateArea>
                    <DayThreePuzzle27 />
                </PrivateArea>
            </Layout>
        </Page>
    );
}
