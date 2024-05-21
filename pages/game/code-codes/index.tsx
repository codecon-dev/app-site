import { GetStaticProps } from 'next';

import Page from '@components/_ui/Page';
import Header from '@components/_ui/Header';
import PrivateArea from '@components/_ui/PrivateArea';
import Rank from '@components/code-codes/Ranking';

import { Sponsor } from '@lib/types/all';
import { AttendeeRank } from '@lib/types/codecodes';

import { RANKING_ENABLED } from '@lib/constants';
import { getRank } from '@lib/codecodes-api';

type Props = {
    sponsors: Sponsor[];
    rankAttendees: AttendeeRank[];
};

export default function Ranking({ rankAttendees }: Props) {
    return (
        <PrivateArea>
            <>
                <Header title="Code-codes" description="Ranking" smaller />
                {RANKING_ENABLED ? (
                    <Rank users={rankAttendees} />
                ) : (
                    <div className="container">
                        <p style={{ marginBottom: 50, fontSize: 20 }}>
                            O ranking está desabilitado. Vamos divulgar o ranking e os resultados ao
                            final do evento.
                            <br />
                            <br /> Boa sorte! :)
                        </p>
                    </div>
                )}
            </>
        </PrivateArea>
    );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
    const { data: rankAttendees } = await getRank();
    const sponsors = [] as Sponsor[];
    return {
        props: {
            sponsors,
            rankAttendees: rankAttendees || []
        },
        revalidate: 1
    };
};
