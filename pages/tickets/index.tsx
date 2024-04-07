import Head from 'next/head';
import PrivateArea from '@components/_ui/PrivateArea';

import Page from '@components/_ui/Page';
import AttendeeArea from '@components/ticket/AttendeeArea';
import { useUserData } from '@lib/hooks/useUserData';

export default function Ticket() {
    const [userData] = useUserData();

    const meta = {
        title: `Área do inscrito - Codecon`
    };

    return (
        <Page meta={meta} theme="summit" noPadding>
            <Head>
                <meta name="robots" content="noindex" />
            </Head>
            <PrivateArea>
                <AttendeeArea attendee={userData} />
            </PrivateArea>
        </Page>
    );
}
