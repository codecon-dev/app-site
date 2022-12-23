import Page from '@components/2022/_ui/Page';
import Layout from '@components/2022/_ui/Layout';
import DayOnePuzzle8 from '@components/2022/enigmas/DayOnePuzzle8';
import PrivateArea from '@components/2022/_ui/PrivateArea';

export default function PuzzleEight() {
    const meta = {
        title: 'Enigmas - Codecon Digital 2022'
    };

    return (
        <Page meta={meta}>
            <Layout hideNav hideFooter>
                <PrivateArea>
                    <DayOnePuzzle8 />
                </PrivateArea>
            </Layout>
        </Page>
    );
}
