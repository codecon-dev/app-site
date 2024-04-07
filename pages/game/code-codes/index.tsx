import { GetStaticProps } from 'next';

import Page from '@components/_ui/Page';
import Header from '@components/_ui/Header';
import Rank from '@components/code-codes/Ranking';

import { Sponsor, AttendeeRank } from '@lib/types/all';
import { RANKING_ENABLED } from '@lib/constants';
import { getRank } from '@lib/codecodes-api';

type Props = {
    sponsors: Sponsor[];
    rankAttendees: AttendeeRank[];
};

export default function Ranking({ rankAttendees, sponsors }: Props) {
    const meta = {
        title: 'Ranking Code-codes - Codecon Summit'
    };

    return (
        <Page theme="digital" meta={meta} sponsors={sponsors}>
            <Header title="Code-codes" description="Ranking" smaller />
            {RANKING_ENABLED ? (
                <Rank users={rankAttendees} />
            ) : (
                <div className="container">
                    <p>
                        O ranking está desabilitado. Vamos divulgar o ranking e os resultados ao
                        final do evento.
                        <br />
                        <br /> Boa sorte! :)
                    </p>
                </div>
            )}
        </Page>
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
