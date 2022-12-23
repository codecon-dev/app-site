import Page from '@components/2022/_ui/Page';
import Layout from '@components/2022/_ui/Layout';
import PrivateArea from '@components/2022/_ui/PrivateArea';
import DayTwoPuzzle20 from '@components/2022/enigmas/DayTwoPuzzle20';

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
