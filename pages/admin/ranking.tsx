import { GetStaticProps } from 'next';

import PrivateArea from '@components/_ui/PrivateArea';
import Rank from '@components/code-codes/Ranking';
import AdminArea from '@components/AdminArea';

import { AttendeeRank } from '@lib/types/all';
import { getRank } from '@lib/codecodes-api';

type Props = {
    rankAttendees: AttendeeRank[];
};

export default function Ranking({ rankAttendees }: Props) {
    return (
        <PrivateArea onlyAdmin>
            <AdminArea>
                <h2>Ranking</h2>
                <Rank users={rankAttendees} />
            </AdminArea>
        </PrivateArea>
    );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
    const { data: rankAttendees } = await getRank();
    return {
        props: {
            rankAttendees: rankAttendees || []
        },
        revalidate: 1
    };
};
