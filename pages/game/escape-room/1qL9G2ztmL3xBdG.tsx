import Page from '@components/_ui/Page';
import Layout from '@components/_ui/Layout';
import Terminal from '@components/escape-room/Terminal';

export default function EscapeRoomOne() {
    const meta = {
        title: 'Escape Room - Codecon Digital 2022'
    };

    return (
        <Page theme='digital' meta={meta}>
            <Layout hideNav hideFooter>
                <Terminal />
            </Layout>
        </Page>
    );
}
