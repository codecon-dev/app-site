import Page from '@components/_ui/Page';
import Layout from '@components/_ui/Layout';
import DayOnePuzzle9 from '@components/enigmas/DayOnePuzzle9';
import PrivateArea from '@components/_ui/PrivateArea';

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
