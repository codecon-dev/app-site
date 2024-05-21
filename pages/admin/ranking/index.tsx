import { GetStaticProps } from 'next';

import PrivateArea from '@components/_ui/PrivateArea';
import AdminArea from '@components/AdminArea';
import Ranking from '@components/AdminArea/Ranking';

import { AttendeeRank } from '@lib/types/codecodes';

import { getRank } from '@lib/codecodes-api';

type Props = {
    rankAttendees: AttendeeRank[];
};

export default function RankingPage({ rankAttendees }: Props) {
    return (
        <PrivateArea onlyAdmin>
            <AdminArea>
                <Ranking rankAttendees={rankAttendees} />
            </AdminArea>
        </PrivateArea>
    );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
    const { data: rankAttendees } = await getRank(true);
    return {
        props: {
            rankAttendees: rankAttendees || []
        },
        revalidate: 1
    };
};
