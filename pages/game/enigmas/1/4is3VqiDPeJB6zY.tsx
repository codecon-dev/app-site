import Page from '@components/_ui/Page';
import Layout from '@components/_ui/Layout';
import DayOnePuzzle4 from '@components/enigmas/DayOnePuzzle4';
import PrivateArea from '@components/_ui/PrivateArea';

export default function PuzzleFour() {
    const meta = {
        title: 'Enigmas - Codecon Digital 2022'
    };

    return (
        <Page theme='digital' meta={meta}>
            <Layout hideNav hideFooter>
                <PrivateArea>
                    <DayOnePuzzle4 />
                </PrivateArea>
            </Layout>
        </Page>
    );
}
