import Page from '@components/_ui/Page';
import Terminal from '@components/escape-room/Terminal';

export default function EscapeRoomOne() {
    const meta = {
        title: 'Escape Room - Codecon Digital 2022'
    };

    return (
        <Page theme="digital" meta={meta} hideNav hideFooter>
            <Terminal />
        </Page>
    );
}
