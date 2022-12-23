import Page from '@components/_ui/Page';
import Layout from '@components/2022/_ui/Layout';
import PrivateArea from '@components/2022/_ui/PrivateArea';
import DayTwoPuzzle19 from '@components/2022/enigmas/DayTwoPuzzle19';

export default function PuzzleNineteen() {
    const meta = {
        title: 'Enigmas - Codecon Digital 2022'
    };

    return (
        <Page meta={meta}>
            <Layout hideNav hideFooter>
                <PrivateArea>
                    <DayTwoPuzzle19 />
                </PrivateArea>
            </Layout>
        </Page>
    );
}
