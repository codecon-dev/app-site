import Page from '@components/_ui/Page';
import DayOnePuzzle0 from '@components/enigmas/DayOnePuzzle0';
import PrivateArea from '@components/_ui/PrivateArea';

export default function PuzzleZero() {
    const meta = {
        title: 'Enigmas - Codecon Digital'
    };

    return (
        <Page theme="digital" meta={meta} hideNav hideFooter noPadding>
            <PrivateArea>
                <DayOnePuzzle0 />
            </PrivateArea>
        </Page>
    );
}
