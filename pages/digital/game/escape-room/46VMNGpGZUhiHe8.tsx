import Page from '@components/_ui/Page';
import PrivateArea from '@components/_ui/PrivateArea';
import Finish from '@components/escape-room/Finish';
import Header from '@components/_ui/Header';

export default function EscapeRoomFour() {
    const meta = {
        title: 'Escape Room - Codecon Digital 2022'
    };

    return (
        <Page theme="digital" meta={meta} hideNav hideFooter>
            <PrivateArea>
                <Finish />
            </PrivateArea>
        </Page>
    );
}
