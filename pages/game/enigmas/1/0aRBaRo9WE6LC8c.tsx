import Page from '@components/_ui/Page';
import Layout from '@components/_ui/Layout';
import DayOnePuzzle0 from '@components/enigmas/DayOnePuzzle0';
import PrivateArea from '@components/_ui/PrivateArea';

export default function PuzzleZero() {
    const meta = {
        title: 'Enigmas - Codecon Digital 2022'
    };

    return (
        <Page theme='digital' meta={meta}>
            <Layout hideNav hideFooter>
                <PrivateArea>
                    <DayOnePuzzle0 />
                </PrivateArea>
            </Layout>
        </Page>
    );
}
