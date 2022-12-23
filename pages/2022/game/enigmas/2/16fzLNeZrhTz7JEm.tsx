import Page from '@components/_ui/Page';
import Layout from '@components/2022/_ui/Layout';
import PrivateArea from '@components/2022/_ui/PrivateArea';
import DayTwoPuzzle16 from '@components/2022/enigmas/DayTwoPuzzle16';

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
