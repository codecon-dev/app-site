import Header from '@components/_ui/Header';
import Layout from '@components/_ui/Layout';
import Page from '@components/_ui/Page';
import { GetServerSideProps } from 'next';
import dataSource from 'src/database/DataSource';
import PuzzleAnswer, { PuzzleAnswerStatus } from 'src/database/model/puzzle/PuzzleAnswer';
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

export const getServerSideProps: GetServerSideProps<Props> = async () => {
    const unformattedRankingList: Array<any> = await PuzzleAnswer.findAll({
        attributes: [
            'userId',
            [dataSource.fn('COUNT', dataSource.col('id')), 'correctGuessCount'],
            [dataSource.fn('MAX', dataSource.col('done_at')), 'lastCorrectGuessDate']
        ],
        where: { status: PuzzleAnswerStatus.DONE },
        group: 'userId',
        order: [
            [dataSource.col('correctGuessCount'), 'DESC'],
            [dataSource.col('lastCorrectGuessDate'), 'ASC']
        ]
    });

    return {
        props: {
            puzzleRank: formattedRankingList
        }
    };
};
