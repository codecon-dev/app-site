import Page from '@components/_ui/Page';
import Layout from '@components/2022/_ui/Layout';
import PrivateArea from '@components/2022/_ui/PrivateArea';
import DayTwoPuzzle13 from '@components/2022/enigmas/DayTwoPuzzle13';

export default function PuzzleThirteen() {
    const meta = {
        title: 'Enigmas - Codecon Digital 2022'
    };

    return (
        <Page meta={meta}>
            <Layout hideNav hideFooter>
                <PrivateArea>
                    <DayTwoPuzzle13 />
                </PrivateArea>
            </Layout>
        </Page>
    );
}
