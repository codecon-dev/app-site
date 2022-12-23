import Page from '@components/_ui/Page';
import Layout from '@components/2022/_ui/Layout';
import DayTwoPuzzle11 from '@components/2022/enigmas/DayTwoPuzzle11';
import PrivateArea from '@components/2022/_ui/PrivateArea';

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
