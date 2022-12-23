import Page from '@components/_ui/Page';
import Layout from '@components/2022/_ui/Layout';
import Terminal from '@components/2022/escape-room/Terminal';

export default function EscapeRoomOne() {
    const meta = {
        title: 'Escape Room - Codecon Digital 2022'
    };

    return (
        <Page meta={meta}>
            <Layout hideNav hideFooter>
                <Terminal />
            </Layout>
        </Page>
    );
}
