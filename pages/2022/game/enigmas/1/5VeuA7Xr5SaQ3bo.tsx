import Page from '@components/2022/_ui/Page';
import Layout from '@components/2022/_ui/Layout';
import DayOnePuzzle5 from '@components/2022/enigmas/DayOnePuzzle5';
import PrivateArea from '@components/2022/_ui/PrivateArea';

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
