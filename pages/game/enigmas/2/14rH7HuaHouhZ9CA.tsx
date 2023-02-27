import Page from '@components/_ui/Page';
import Layout from '@components/_ui/Layout';
import PrivateArea from '@components/_ui/PrivateArea';
import DayTwoPuzzle14 from '@components/enigmas/DayTwoPuzzle14';

export default function PuzzleFourteen() {
    const meta = {
        title: 'Enigmas - Codecon Digital 2022'
    };

    return (
        <Page theme='digital' meta={meta}>
            <Layout hideNav hideFooter>
                <PrivateArea>
                    <DayTwoPuzzle14 />
                </PrivateArea>
            </Layout>
        </Page>
    );
}
