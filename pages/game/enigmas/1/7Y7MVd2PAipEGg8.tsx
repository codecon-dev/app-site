import Page from '@components/_ui/Page';
import Layout from '@components/_ui/Layout';
import DayOnePuzzle7 from '@components/enigmas/DayOnePuzzle7';
import PrivateArea from '@components/_ui/PrivateArea';

export default function PuzzleSeven() {
    const meta = {
        title: 'Enigmas - Codecon Digital 2022'
    };

    return (
        <Page meta={meta}>
            <Layout hideNav hideFooter>
                <PrivateArea>
                    <DayOnePuzzle7 />
                </PrivateArea>
            </Layout>
        </Page>
    );
}
