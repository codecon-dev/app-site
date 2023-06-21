import Page from '@components/_ui/Page';
import PrivateArea from '@components/_ui/PrivateArea';
import PuzzleNine from '@components/enigmas/blip/PuzzleNine';

export default function PuzzleZero() {
    const meta = {
        title: 'Enigmas - Codecon Digital'
    };

    return (
        <Page theme="digital" meta={meta} hideNav hideFooter noPadding>
            <PrivateArea>
                <PuzzleNine />
            </PrivateArea>
        </Page>
    );
}
