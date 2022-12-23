import Page from '@components/_ui/Page';
import Layout from '@components/2022/_ui/Layout';
import DayOnePuzzle3 from '@components/2022/enigmas/DayOnePuzzle3';
import PrivateArea from '@components/2022/_ui/PrivateArea';

export default function PuzzleThree() {
    const meta = {
        title: 'Enigmas - Codecon Digital 2022'
    };

    return (
        <Page meta={meta}>
            <Layout hideNav hideFooter>
                <PrivateArea>
                    <DayOnePuzzle3 />
                </PrivateArea>
            </Layout>
        </Page>
    );
}
