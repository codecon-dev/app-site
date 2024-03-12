import { GetServerSideProps } from 'next';
import Head from 'next/head';
import LoginLinkService from 'src/services/LoginLinkService';
import Attendee from 'src/database/model/Attendee';

import Page from '@components/_ui/Page';
import Login from '@components/ticket/Login';
import AttendeeArea from '@components/ticket/AttendeeArea';

type Props = {
    isLogged: boolean;
    attendee: Attendee;
};

export default function Ticket({ isLogged, attendee }: Props) {
    const meta = {
        title: `Área do inscrito - Codecon`
    };

    return (
        <Page meta={meta} theme="feature" noPadding>
            <Head>
                <meta name="robots" content="noindex" />
            </Head>
            {isLogged ? <AttendeeArea attendee={attendee} /> : <Login />}
        </Page>
    );
}

export const getServerSideProps: GetServerSideProps = async (context: any) => {
    const hash: string = context.req.cookies.USERHASHFEATURE;

    if (!hash) {
        return {
            props: {
                isLogged: false
            }
        };
    }

    const attendeeUuid = await LoginLinkService.isLogged(hash);

    if (!attendeeUuid) {
        return {
            props: {
                isLogged: false
            }
        };
    }

    const attendee = await Attendee.findByPk(attendeeUuid);

    return {
        props: {
            isLogged: true,
            attendee: {
                id: attendee?.id,
                name: attendee?.name,
                email: attendee?.email,
                githubFullName: attendee?.githubFullName,
                githubUsername: attendee?.githubUsername,
                even3Id: attendee?.even3Id
            }
        }
    };
};
