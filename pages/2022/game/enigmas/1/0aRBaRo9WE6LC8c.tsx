import Page from '@components/_ui/Page';
import Layout from '@components/2022/_ui/Layout';
import DayOnePuzzle0 from '@components/2022/enigmas/DayOnePuzzle0';
import PrivateArea from '@components/2022/_ui/PrivateArea';

export default function PuzzleZero() {
    const meta = {
        title: 'Enigmas - Codecon Digital 2022'
    };

    return (
        <Page meta={meta}>
            <Layout hideNav hideFooter>
                <PrivateArea>
                    <DayOnePuzzle0 />
                </PrivateArea>
            </Layout>
        </Page>
    );
}
