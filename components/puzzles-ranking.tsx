import styles from './ranking.module.css';

import { PuzzleUser } from '@lib/types';
import MaterialTable from 'material-table';

type Props = {
  users: PuzzleUser[];
};

export default function PuzzlesRanking({ users }: Props) {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <p className={styles.how}>
          Está com dúvidas? Veja{' '}
          <a href="/game/enigmas/como-funciona">como funciona e as premiações</a> para este jogo.
        </p>
        <MaterialTable
          options={{ pageSize: 10 }}
          columns={[
            { title: 'Posição', field: 'position', cellStyle: { width: '10%' } },
            { title: 'Nome', field: 'name' },
            { title: 'Enigmas descobertos', field: 'points', type: 'numeric' },
            { title: 'Último envio', field: 'lastSent', align: 'right' }
          ]}
          data={users}
          title="Ranking"
        />
        <br />
        <p className={styles.criteria}>
          Critérios de desempate: quem mais descobriu enigmas; quem descobriu o último enigma antes.
        </p>
      </div>
    </section>
  );
}
