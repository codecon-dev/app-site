import Page from '@components/_ui/Page';
import Layout from '@components/_ui/Layout';
import PrivateArea from '@components/_ui/PrivateArea';
import DayThreePuzzle20 from '@components/enigmas/DayThreePuzzle20';

export default function PuzzleTwenty() {
    const meta = {
        title: 'Enigmas - Codecon Digital 2022'
    };

    return (
        <Page meta={meta}>
            <Layout hideNav hideFooter>
                <PrivateArea>
                    <DayThreePuzzle20 />
                </PrivateArea>
            </Layout>
        </Page>
    );
}
