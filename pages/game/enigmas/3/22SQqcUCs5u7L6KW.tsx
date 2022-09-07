import Page from '@components/_ui/Page';
import Layout from '@components/_ui/Layout';
import PrivateArea from '@components/_ui/PrivateArea';
import DayThreePuzzle22 from '@components/enigmas/DayThreePuzzle22';

export default function PuzzleTwentyTwo() {
    const meta = {
        title: 'Enigmas - Codecon Digital 2022'
    };

    return (
        <Page meta={meta}>
            <Layout hideNav hideFooter>
                <PrivateArea>
                    <DayThreePuzzle22 />
                </PrivateArea>
            </Layout>
        </Page>
    );
}
