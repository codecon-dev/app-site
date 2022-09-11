import Page from '@components/_ui/Page';
import Layout from '@components/_ui/Layout';
import PrivateArea from '@components/_ui/PrivateArea';
import DayTwoPuzzle17 from '@components/enigmas/DayTwoPuzzle17';

export default function PuzzleSeventeen() {
    const meta = {
        title: 'Enigmas - Codecon Digital 2022'
    };

    return (
        <Page meta={meta}>
            <Layout hideNav hideFooter>
                <PrivateArea>
                    <DayTwoPuzzle17 />
                </PrivateArea>
            </Layout>
        </Page>
    );
}