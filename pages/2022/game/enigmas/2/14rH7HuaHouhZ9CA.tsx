import Page from '@components/2022/_ui/Page';
import Layout from '@components/2022/_ui/Layout';
import PrivateArea from '@components/2022/_ui/PrivateArea';
import DayTwoPuzzle14 from '@components/2022/enigmas/DayTwoPuzzle14';

export default function PuzzleFourteen() {
    const meta = {
        title: 'Enigmas - Codecon Digital 2022'
    };

    return (
        <Page meta={meta}>
            <Layout hideNav hideFooter>
                <PrivateArea>
                    <DayTwoPuzzle14 />
                </PrivateArea>
            </Layout>
        </Page>
    );
}
