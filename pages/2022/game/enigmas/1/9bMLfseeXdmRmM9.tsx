import Page from '@components/2022/_ui/Page';
import Layout from '@components/2022/_ui/Layout';
import DayOnePuzzle9 from '@components/2022/enigmas/DayOnePuzzle9';
import PrivateArea from '@components/2022/_ui/PrivateArea';

export default function PuzzleNine() {
    const meta = {
        title: 'Enigmas - Codecon Digital 2022'
    };

    return (
        <Page meta={meta}>
            <Layout hideNav hideFooter>
                <PrivateArea>
                    <DayOnePuzzle9 />
                </PrivateArea>
            </Layout>
        </Page>
    );
}
