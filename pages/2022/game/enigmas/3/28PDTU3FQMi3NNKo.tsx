import Page from '@components/_ui/Page';
import Layout from '@components/2022/_ui/Layout';
import PrivateArea from '@components/2022/_ui/PrivateArea';
import DayThreePuzzle28 from '@components/2022/enigmas/DayThreePuzzle28';

export default function PuzzleTwentyEight() {
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
