import Page from '@components/_ui/Page';
import Layout from '@components/_ui/Layout';
import PrivateArea from '@components/_ui/PrivateArea';
import DayTwoPuzzle16 from '@components/enigmas/DayTwoPuzzle16';

export default function PuzzleSixteen() {
    const meta = {
        title: 'Enigmas - Codecon Digital 2022'
    };

    return (
        <Page meta={meta}>
            <Layout hideNav hideFooter>
                <PrivateArea>
                    <DayTwoPuzzle16 />
                </PrivateArea>
            </Layout>
        </Page>
    );
}
