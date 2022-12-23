import Page from '@components/2022/_ui/Page';
import Layout from '@components/2022/_ui/Layout';
import PrivateArea from '@components/2022/_ui/PrivateArea';
import DayThreePuzzle22 from '@components/2022/enigmas/DayThreePuzzle22';

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
