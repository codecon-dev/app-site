import { GetStaticProps, GetStaticPaths } from 'next';

import { getToken } from '@lib/codecodes-api';

import { AttendeeCodeCodes, AttendeeRank } from '@lib/types/codecodes';

import PrivateArea from '@components/_ui/PrivateArea';
import AdminArea from '@components/AdminArea';
import Ranking from '@components/AdminArea/Ranking';

import { getRank, getUser } from '@lib/codecodes-api';

type Props = {
    user: AttendeeCodeCodes;
    rankAttendees: AttendeeRank[];
};

export default function Token({ user, rankAttendees }: Props) {
    return (
        <PrivateArea onlyAdmin>
            <AdminArea>
                <Ranking user={user} rankAttendees={rankAttendees} />
            </AdminArea>
        </PrivateArea>
    );
}

export const getStaticProps: GetStaticProps<any> = async ({ params }) => {
    const userId = params?.userId;

    const { data: rankAttendees } = await getRank(true);
    const { data: user } = await getUser(userId as string);

    if (!user) {
        return {
            notFound: true
        };
    }

    return {
        props: {
            user,
            rankAttendees
        }
    };
};

export const getStaticPaths: GetStaticPaths<{ slug: string }> = () => {
    return {
        paths: [],
        fallback: 'blocking'
    };
};
