import Page from '@components/_ui/Page';
import Layout from '@components/_ui/Layout';
import DayOnePuzzle10 from '@components/enigmas/DayOnePuzzle10';
import PrivateArea from '@components/_ui/PrivateArea';

export default function PuzzleTen() {
    const meta = {
        title: 'Enigmas - Codecon Digital 2022'
    };

    return (
        <Page theme='digital' meta={meta}>
            <Layout hideNav hideFooter>
                <PrivateArea>
                    <DayOnePuzzle10 />
                </PrivateArea>
            </Layout>
        </Page>
    );
}
