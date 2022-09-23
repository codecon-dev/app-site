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
                <p>
                    Está com dúvidas? Veja{' '}
                    <Link href="/game/code-codes/como-funciona">
                        <a>como funciona</a>
                    </Link>{' '}
                    o code-codes.
                </p>
                <p>
                    <small>
                        Em 23/09/2022 14:28 houve uma recontagem dos pontos pois foi encontrado um
                        problema na plataforma que estava contabilizando pontos erroneamente para
                        alguns participantes. O ranking sofreu algumas mudanças.
                    </small>
                </p>
            </div>
        </section>
    );
}
