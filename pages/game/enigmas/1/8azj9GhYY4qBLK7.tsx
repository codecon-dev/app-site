import Page from '@components/_ui/Page';
import Layout from '@components/_ui/Layout';
import DayOnePuzzle8 from '@components/enigmas/DayOnePuzzle8';
import PrivateArea from '@components/_ui/PrivateArea';

export default function PuzzleEight() {
    const meta = {
        title: 'Enigmas - Codecon Digital 2022'
    };

    return (
        <Page theme='digital' meta={meta}>
            <Layout hideNav hideFooter>
                <PrivateArea>
                    <DayOnePuzzle8 />
                </PrivateArea>
            </Layout>
        </Page>
    );
}
