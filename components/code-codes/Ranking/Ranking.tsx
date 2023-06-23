import Link from 'next/link';
import MaterialTable from 'material-table';

import { UserRank } from '@lib/types/all';

export default function Ranking({ users }: { users: UserRank[] }) {
    const rankUsers = users.map((user, index) => ({
        tag: user.tag,
        score: user.score,
        position: index + 1,
        claims: user.claims
    }));

    return (
        <section>
            <div className="container">
                <MaterialTable
                    options={{ pageSize: 10 }}
                    columns={[
                        { title: 'Posição', field: 'position', cellStyle: { width: '10%' } },
                        { title: 'Nome', field: 'tag' },
                        { title: 'Pontuação', field: 'score', type: 'numeric' },
                        { title: 'Resgates', field: 'claims', type: 'numeric' }
                    ]}
                    data={rankUsers}
                    title="Ranking"
                />
                <br />
                <p>
                    <strong>Critérios de desempate:</strong> quem mais pontuou; quem mais fez
                    resgates; quem fez o primeiro resgate antes; sorteio.
                </p>
            </div>
        </section>
    );
}
