import Header from '@components/_ui/Header';
import Page from '@components/_ui/Page';
import Ranking, { Rankeable } from '@components/_ui/Ranking/Ranking';
import { GetServerSideProps } from 'next';
import dataSource from 'src/database/DataSource';
import { PuzzleCompanyType } from 'src/database/model/puzzle/Puzzle';
import PuzzleAnswer, { PuzzleAnswerStatus } from 'src/database/model/puzzle/PuzzleAnswer';
import Attendee from 'src/database/model/Attendee';

type Props = {
    puzzleRank: Array<EnigmaRankingRow>;
};

export default function EnigmaRanking({ puzzleRank }: Props) {
    const meta = {
        title: 'Rankings dos Enigmas - Codecon Digital'
    };

    return (
        <Page theme="digital" meta={meta} hideNav hideFooter>
            <Header title="Enigmas da TOTVS" description="Ranking dos participantes" smaller />
            <Ranking
                data={puzzleRank}
                columns={[
                    { title: 'Nome', field: 'name' },
                    { title: 'Acertos', field: 'correctGuessCount', type: 'numeric' },
                    { title: 'Último acerto em', field: 'lastCorrectGuessDate' }
                ]}
            >
                <p>
                    <strong>Critérios de desempate:</strong> quem mais acertou; quem teve o último
                    acerto primeiro.
                </p>
            </Ranking>
        </Page>
    );
}

interface EnigmaRankingRow extends Rankeable {
    name: string;
    correctGuessCount: number;
    lastCorrectGuessDate: string;
}

type RankQueryReturn = {
    userId: number;
    correctGuessCount: number;
    lastCorrectGuessDate: Date;
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
    const unformattedRankingList: Array<PuzzleAnswer> = await PuzzleAnswer.findAll({
        attributes: [
            'userId',
            [dataSource.fn('COUNT', dataSource.col('id')), 'correctGuessCount'],
            [dataSource.fn('MAX', dataSource.col('done_at')), 'lastCorrectGuessDate']
        ],
        where: { status: PuzzleAnswerStatus.DONE, company: PuzzleCompanyType.TOTVS },
        group: 'userId',
        order: [
            [dataSource.col('correctGuessCount'), 'DESC'],
            [dataSource.col('lastCorrectGuessDate'), 'ASC']
        ]
    });

    const formattedRankingList: Array<EnigmaRankingRow> = [];
    for (let i = 0; i < unformattedRankingList.length; i++) {
        const unformattedRankingItem: RankQueryReturn = unformattedRankingList[i].dataValues;
        const user: Attendee | null = await Attendee.findByPk(unformattedRankingItem.userId);
        if (!user) throw new Error(`Usuário [${unformattedRankingItem.userId}] não encontrado`);

        formattedRankingList.push({
            position: i + 1,
            name: user.name,
            correctGuessCount: unformattedRankingItem.correctGuessCount,
            lastCorrectGuessDate: unformattedRankingItem.lastCorrectGuessDate.toLocaleString(
                'pt-BR',
                { timeZone: 'America/Sao_Paulo' }
            )
        });
    }

    return {
        props: {
            puzzleRank: formattedRankingList
        }
    };
};
