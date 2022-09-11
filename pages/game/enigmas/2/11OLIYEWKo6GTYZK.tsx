import Page from '@components/_ui/Page';
import Layout from '@components/_ui/Layout';
import DayTwoPuzzle11 from '@components/enigmas/DayTwoPuzzle11';
import PrivateArea from '@components/_ui/PrivateArea';

export default function PuzzleTwo() {
    const meta = {
        title: 'Enigmas - Codecon Digital 2022'
    };

    return (
        <Page meta={meta}>
            <Layout hideNav hideFooter>
                <PrivateArea>
                    <DayTwoPuzzle11 />
                </PrivateArea>
            </Layout>
        </Page>
    );
}
