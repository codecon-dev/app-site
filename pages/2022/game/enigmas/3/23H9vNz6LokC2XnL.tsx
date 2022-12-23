import Page from '@components/2022/_ui/Page';
import Layout from '@components/2022/_ui/Layout';
import PrivateArea from '@components/2022/_ui/PrivateArea';
import DayThreePuzzle23 from '@components/2022/enigmas/DayThreePuzzle23';

export default function PuzzleTwentyThree() {
    const meta = {
        title: 'Enigmas - Codecon Digital 2022'
    };

    return (
        <Page meta={meta}>
            <Layout hideNav hideFooter>
                <PrivateArea>
                    <DayThreePuzzle23 />
                </PrivateArea>
            </Layout>
        </Page>
    );
}
