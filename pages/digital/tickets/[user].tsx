import { GetStaticProps, GetStaticPaths } from 'next';

import Page from '@components/_ui/Page';
import Attendee from 'src/database/model/Attendee';

import HeroTicket from '@components/ticket/HeroTicket';

type Props = {
    attendee: Attendee;
};

export default function Tickets({ attendee }: Props) {
    const params = {
        name: attendee.githubFullName,
        username: attendee.githubUsername,
        ticketNumber: attendee.id,
        event: 'digital'
    };

    const meta = {
        title: `${attendee.name} estará da Codecon Digital`,
        image: `/api/ticket/image?params=${btoa(JSON.stringify(params))}`
    };

    return (
        <Page theme="digital" meta={meta} noPadding>
            <HeroTicket attendee={attendee} />
        </Page>
    );
}

export const getStaticProps: GetStaticProps<any> = async ({ params }) => {
    const user = params?.user;
    const attendee = await Attendee.findByGithubUsername(user as string);

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
                symplaId: attendee?.symplaId
            }
        }
    };
};

export const getStaticPaths: GetStaticPaths = async () => {
    const attendees = await Attendee.findAllWithGithubUsername();

    if (!attendees) {
        return {
            paths: [],
            fallback: 'blocking'
        };
    }

    const paths = attendees.map(a => ({ params: { user: a.githubUsername } }));

    return {
        paths,
        fallback: false
    };
};
