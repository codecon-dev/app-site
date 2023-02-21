import Page from '@components/_ui/Page';
import Layout from '@components/_ui/Layout';
import PrivateArea from '@components/_ui/PrivateArea';
import DayTwoPuzzle20 from '@components/enigmas/DayTwoPuzzle20';

export default function PuzzleTwenty() {
    const meta = {
        title: 'Enigmas - Codecon Digital 2022'
    };

    return (
        <Page meta={meta}>
            <Layout hideNav hideFooter>
                <PrivateArea>
                    <DayTwoPuzzle20 />
                </PrivateArea>
            </Layout>
        </Page>
    );
}
