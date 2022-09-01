import Header from '@components/_ui/Header';
import Layout from '@components/_ui/Layout';
import Page from '@components/_ui/Page';
type Props = {
};

export default function EnigmaRanking({ puzzleRank }: Props) {
    const meta = {
        title: 'Rankings dos Enigmas - Codecon Digital 2022'
    };

    return (
        <Page meta={meta}>
            <Layout hideNav hideFooter>
                <Header title="Enigmas" description="Ranking dos participantes" />
            </Layout>
        </Page>
    );
}

