import { GetStaticProps, GetStaticPaths } from 'next';
import { useRouter } from 'next/router';

import Page from '@components/_ui/Page';
import Attendee from 'src/database/model/Attendee';

import HeroTicket from '@components/ticket/HeroTicket';

type Props = {
    attendee: Attendee;
};

export default function Tickets({ attendee }: Props) {
    const router = useRouter();

    if (router.isFallback) {
        return <div>Carregando...</div>;
    }

    const params = {
        name: attendee.githubFullName || attendee.name,
        username: attendee.githubUsername,
        ticketNumber: attendee.id,
        event: 'summit'
    };

    const meta = {
        title: `${attendee.name} estará na Codecon Summit`,
        image: `/api/ticket/image?params=${btoa(JSON.stringify(params))}`
    };

    return (
        <Page theme="summit" meta={meta} noPadding hideNavMenu>
            <HeroTicket attendee={attendee} />
        </Page>
    );
}

export const getStaticProps: GetStaticProps<any> = async ({ params }) => {
    const user = params?.user;
    const attendee = await Attendee.findBygithubUsernameAndEvent(user as string, 'SUMMIT');

    if (!attendee) {
        return {
            notFound: true
        };
    }

    return {
        props: {
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

export const getStaticPaths: GetStaticPaths = async () => {
    const attendees = await Attendee.findAllWithgithubUsernameAndEvent('SUMMIT');

    if (!attendees) {
        return {
            paths: [],
            fallback: 'blocking'
        };
    }

    const paths = attendees.map(a => ({ params: { user: a.githubUsername } }));

    return {
        paths,
        fallback: true
    };
};
