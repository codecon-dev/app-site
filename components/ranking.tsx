import styles from './ranking.module.css';

import { UserRank } from '@lib/types';
import MaterialTable from 'material-table';

export default function Ranking({ users }: { users: UserRank[] }) {
  const rankUsers = users.map((user, index) => ({
    tag: user.tag,
    score: user.score,
    position: index + 1,
    claims: user.claims
  }));

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <p className={styles.how}>
          Está com dúvidas? Veja{' '}
          <a href="/game/code-codes/como-funciona">como funciona e as premiações</a> para este jogo.
        </p>
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
        <p className={styles.criteria}>
          Critérios de desempate: quem mais pontuou; quem mais fez resgates; quem fez o primeiro
          resgate antes; sorteio.
        </p>
      </div>
    </section>
  );
}
