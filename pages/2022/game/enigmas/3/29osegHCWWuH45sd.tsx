import Page from '@components/_ui/Page';
import Layout from '@components/2022/_ui/Layout';
import PrivateArea from '@components/2022/_ui/PrivateArea';
import DayThreePuzzle29 from '@components/2022/enigmas/DayThreePuzzle29';

export default function PuzzleTwentyNine() {
    const meta = {
        title: 'Enigmas - Codecon Digital 2022'
    };

    return (
        <Page meta={meta}>
            <Layout hideNav hideFooter>
                <PrivateArea>
                    <DayThreePuzzle29 />
                </PrivateArea>
            </Layout>
        </Page>
    );
}
