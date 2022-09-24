import { GetStaticProps } from 'next';

import Page from '@components/_ui/Page';
import Layout from '@components/_ui/Layout';
import Header from '@components/_ui/Header';
import Rank from '@components/code-codes/Ranking';

import { Sponsor, UserRank } from '@lib/types/all';
import { META_DESCRIPTION, RANKING_ENABLED } from '@lib/constants';
import { getRank } from '@lib/codecodes-api';

type Props = {
    sponsors: Sponsor[];
    rankUsers: UserRank[];
};

export default function Ranking({ rankUsers, sponsors }: Props) {
    const meta = {
        title: 'Ranking Code-codes - Codecon Digital 2021',
        description: META_DESCRIPTION
    };

    return (
        <Page meta={meta}>
            <Layout sponsors={sponsors} hideNav hideFooter>
                <Header title="Code-codes" description="Ranking" smaller />
                {RANKING_ENABLED ? (
                    <Rank users={rankUsers} />
                ) : (
                    <p style={{ textAlign: 'center', padding: 20 }}>
                        O ranking está desabilitado. Vamos divulgar o resultado às 19h00 em nossas
                        redes sociais. Os resgaters continuam ativos até às 18h00.
                        <br />
                        <br /> Boa sorte! :)
                    </p>
                )}
            </Layout>
        </Page>
    );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
    const { data: rankUsers } = await getRank();
    const sponsors = [] as Sponsor[];
    return {
        props: {
            sponsors,
            rankUsers: rankUsers || []
        },
        revalidate: 1
    };
};
