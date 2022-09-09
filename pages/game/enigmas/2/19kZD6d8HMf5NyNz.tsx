import Page from '@components/_ui/Page';
import Layout from '@components/_ui/Layout';
import PrivateArea from '@components/_ui/PrivateArea';
import DayTwoPuzzle19 from '@components/enigmas/DayTwoPuzzle19';

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
