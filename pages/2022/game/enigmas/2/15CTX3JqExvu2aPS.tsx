import Page from '@components/_ui/Page';
import Layout from '@components/2022/_ui/Layout';
import PrivateArea from '@components/2022/_ui/PrivateArea';
import DayTwoPuzzle15 from '@components/2022/enigmas/DayTwoPuzzle15';

export default function PuzzleFifteen() {
    const meta = {
        title: 'Enigmas - Codecon Digital 2022'
    };

    return (
        <Page meta={meta}>
            <Layout hideNav hideFooter>
                <PrivateArea>
                    <DayTwoPuzzle15 />
                </PrivateArea>
            </Layout>
        </Page>
    );
}
