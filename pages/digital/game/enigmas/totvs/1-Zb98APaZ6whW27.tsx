import Page from '@components/_ui/Page';
import PuzzleOne from '@components/enigmas/totvs/PuzzleOne';
import PrivateArea from '@components/_ui/PrivateArea';

export default function PuzzleZero() {
    const meta = {
        title: 'Enigmas - Codecon Digital'
    };

    return (
        <Page theme="digital" meta={meta} hideNav hideFooter noPadding>
            <PrivateArea>
                <PuzzleOne />
            </PrivateArea>
        </Page>
    );
}
