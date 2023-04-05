import { GetServerSideProps } from 'next';
import Head from 'next/head';
import LoginLinkService from 'src/services/LoginLinkService';
import Attendee from 'src/database/model/Attendee';

import Page from '@components/_ui/Page';
import Login from '@components/ticket/Login';
import TheTicket from '@components/ticket/TheTicket';
import Form from '@components/ticket/Form';

type Props = {
    isLogged: boolean;
    attendee: Attendee;
};

export default function Ticket({ isLogged, attendee }: Props) {
    const meta = {
        title: `Área do inscrito - Codecon`
    };

    return (
        <Page meta={meta} theme="digital">
            <Head>
                <meta name="robots" content="noindex" />
            </Head>
            {isLogged ? (
                <>
                    <TheTicket />
                    <Form attendee={attendee} />
                </>
            ) : (
                <Login />
            )}
        </Page>
    );
}

export const getServerSideProps: GetServerSideProps = async (context: any) => {
    const hash: string = context.req.cookies.USERHASH;

    if (!hash) {
        return {
            props: {
                isLogged: false
            }
        };
    }

    const attendeeId = await LoginLinkService.isLogged(hash);

    if (!attendeeId) {
        return {
            props: {
                isLogged: false
            }
        };
    }

    const attendee = await Attendee.findByPk(attendeeId);

    return {
        props: {
            isLogged: true,
            attendee: {
                id: attendee?.id,
                name: attendee?.name,
                email: attendee?.email,
                githubFullName: attendee?.githubFullName,
                githubUsername: attendee?.githubUsername,
                symplaId: attendee?.symplaId
            }
        }
    };
};
