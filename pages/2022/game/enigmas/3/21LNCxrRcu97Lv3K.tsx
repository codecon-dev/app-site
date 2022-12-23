import Page from '@components/_ui/Page';
import Layout from '@components/2022/_ui/Layout';
import PrivateArea from '@components/2022/_ui/PrivateArea';
import DayThreePuzzle21 from '@components/2022/enigmas/DayThreePuzzle21';

export default function PuzzleTwentyOne() {
    const meta = {
        title: 'Enigmas - Codecon Digital 2022'
    };

    return (
        <Page meta={meta}>
            <Layout hideNav hideFooter>
                <PrivateArea>
                    <DayThreePuzzle21 />
                </PrivateArea>
            </Layout>
        </Page>
    );
}
