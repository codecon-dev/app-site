import Page from '@components/_ui/Page';
import PrivateArea from '@components/_ui/PrivateArea';
import Finish from '@components/escape-room/Finish';

export default function EscapeRoomFour() {
    const meta = {
        title: 'Escape Room - Codecon Digital'
    };

    return (
        <Page theme="digital" meta={meta} hideNav hideFooter>
            <PrivateArea>
                <Finish />
            </PrivateArea>
        </Page>
    );
}
