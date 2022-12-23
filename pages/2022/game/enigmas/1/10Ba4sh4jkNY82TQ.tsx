import Page from '@components/2022/_ui/Page';
import Layout from '@components/2022/_ui/Layout';
import DayOnePuzzle10 from '@components/2022/enigmas/DayOnePuzzle10';
import PrivateArea from '@components/2022/_ui/PrivateArea';

export default function PuzzleTen() {
    const meta = {
        title: 'Enigmas - Codecon Digital 2022'
    };

    return (
        <Page meta={meta}>
            <Layout hideNav hideFooter>
                <PrivateArea>
                    <DayOnePuzzle10 />
                </PrivateArea>
            </Layout>
        </Page>
    );
}
