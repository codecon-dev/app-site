import Header from '@components/_ui/Header';
import Layout from '@components/_ui/Layout';
import Page from '@components/_ui/Page';
import Ranking, { Rankeable } from '@components/_ui/Ranking/Ranking';
import { GetServerSideProps } from 'next';
import dataSource from 'src/database/DataSource';
import PuzzleAnswer, { PuzzleAnswerStatus } from 'src/database/model/puzzle/PuzzleAnswer';
import User from 'src/database/model/User';

type Props = {
    puzzleRank: Array<EnigmaRankingRow>;
};

export default function EnigmaRanking({ puzzleRank }: Props) {
    const meta = {
        title: 'Rankings dos Enigmas - Codecon Digital 2022'
    };

    return (
        <Page meta={meta}>
            <Layout hideNav hideFooter>
                <Header title="Enigmas" description="Ranking dos participantes" />
                <Ranking
                    data={puzzleRank}
                    columns={[
                        { title: 'Nome', field: 'name' },
                        { title: 'Acertos', field: 'correctGuessCount', type: 'numeric' },
                        { title: 'Último acerto em', field: 'lastCorrectGuessDate' }
                    ]}
                >
                    <p>
                        <strong>Critérios de desempate:</strong> quem mais acertou; quem teve o
                        último acerto primeiro.
                    </p>
                </Ranking>
            </Layout>
        </Page>
    );
}

interface EnigmaRankingRow extends Rankeable {
    name: string;
    correctGuessCount: number;
    lastCorrectGuessDate: string;
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

    let formattedRankingList: Array<EnigmaRankingRow> = [];
    for (let i = 0; i < unformattedRankingList.length; i++) {
        const unformattedRankingItem = unformattedRankingList[i].dataValues;
        const user: User | null = await User.findByPk(unformattedRankingItem.userId);
        if (!user) throw new Error(`Usuário [${unformattedRankingItem.userId}] não encontrado`);

        formattedRankingList.push({
            position: i + 1,
            name: user.name,
            correctGuessCount: unformattedRankingItem.correctGuessCount,
            lastCorrectGuessDate: new Date(
                unformattedRankingItem.lastCorrectGuessDate
            ).toLocaleString()
        });
    }

    return {
        props: {
            puzzleRank: formattedRankingList
        }
    };
};
