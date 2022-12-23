import Page from '@components/2022/_ui/Page';
import Layout from '@components/2022/_ui/Layout';
import DayOnePuzzle2 from '@components/2022/enigmas/DayOnePuzzle2';
import PrivateArea from '@components/2022/_ui/PrivateArea';

export default function PuzzleTwo() {
    const meta = {
        title: 'Enigmas - Codecon Digital 2022'
    };

    return (
        <Page meta={meta}>
            <Layout hideNav hideFooter>
                <PrivateArea>
                    <DayOnePuzzle2 />
                </PrivateArea>
            </Layout>
        </Page>
    );
}
