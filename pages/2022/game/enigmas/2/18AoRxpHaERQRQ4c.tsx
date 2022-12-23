import Page from '@components/2022/_ui/Page';
import Layout from '@components/2022/_ui/Layout';
import PrivateArea from '@components/2022/_ui/PrivateArea';
import DayTwoPuzzle18 from '@components/2022/enigmas/DayTwoPuzzle18';

export default function PuzzleEighteen() {
    const meta = {
        title: 'Enigmas - Codecon Digital 2022'
    };

    return (
        <Page meta={meta}>
            <Layout hideNav hideFooter>
                <PrivateArea>
                    <DayTwoPuzzle18 />
                </PrivateArea>
            </Layout>
        </Page>
    );
}
