import Page from '@components/_ui/Page';
import Layout from '@components/_ui/Layout';
import DayOnePuzzle6 from '@components/enigmas/DayOnePuzzle6';
import PrivateArea from '@components/_ui/PrivateArea';

export default function PuzzleSix() {
    const meta = {
        title: 'Enigmas - Codecon Digital 2022'
    };

    return (
        <Page theme='digital' meta={meta}>
            <Layout hideNav hideFooter>
                <PrivateArea>
                    <DayOnePuzzle6 />
                </PrivateArea>
            </Layout>
        </Page>
    );
}
