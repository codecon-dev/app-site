import Page from '@components/2022/_ui/Page';
import Layout from '@components/2022/_ui/Layout';
import PrivateArea from '@components/2022/_ui/PrivateArea';
import Finish from '@components/2022/escape-room/Finish';
import Header from '@components/2022/_ui/Header';

export default function EscapeRoomFour() {
    const meta = {
        title: 'Escape Room - Codecon Digital 2022'
    };

    return (
        <Page meta={meta}>
            <Layout hideNav hideFooter>
                <PrivateArea>
                    <Finish />
                </PrivateArea>
            </Layout>
        </Page>
    );
}
