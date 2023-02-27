import Page from '@components/_ui/Page';
import Layout from '@components/_ui/Layout';
import PrivateArea from '@components/_ui/PrivateArea';
import DayThreePuzzle30 from '@components/enigmas/DayThreePuzzle30';

export default function PuzzleThirty() {
    const meta = {
        title: 'Enigmas - Codecon Digital 2022'
    };

    return (
        <Page theme='digital' meta={meta}>
            <Layout hideNav hideFooter>
                <PrivateArea>
                    <DayThreePuzzle30 />
                </PrivateArea>
            </Layout>
        </Page>
    );
}
