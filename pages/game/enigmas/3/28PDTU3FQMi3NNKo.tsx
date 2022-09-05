import Page from '@components/_ui/Page';
import Layout from '@components/_ui/Layout';
import PrivateArea from '@components/_ui/PrivateArea';
import DayThreePuzzle28 from '@components/enigmas/DayThreePuzzle28';

export default function PuzzleOne() {
    const meta = {
        title: 'Enigmas - Codecon Digital 2022'
    };

    return (
        <Page meta={meta}>
            <Layout hideNav hideFooter>
                <PrivateArea>
                    <DayThreePuzzle28 />
                </PrivateArea>
            </Layout>
        </Page>
    );
}
