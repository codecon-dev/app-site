import Page from '@components/_ui/Page';
import Layout from '@components/_ui/Layout';
import DayOnePuzzle5 from '@components/enigmas/DayOnePuzzle5';
import PrivateArea from '@components/_ui/PrivateArea';

export default function PuzzleFive() {
    const meta = {
        title: 'Enigmas - Codecon Digital 2022'
    };

    return (
        <Page meta={meta}>
            <Layout hideNav hideFooter>
                <PrivateArea>
                    <DayOnePuzzle5 />
                </PrivateArea>
            </Layout>
        </Page>
    );
}
