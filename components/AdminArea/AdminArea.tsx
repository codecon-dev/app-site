import cn from 'classnames';

import { Grid, Column } from '@components/_ui/Grid';

import styles from './AdminArea.module.scss';
import Stats from './Stats';

export default function AdminArea({ children }: { children: React.ReactNode }) {
    return (
        <section className={cn(styles.section)}>
            <Grid align="start">
                <Column lg={2} sm={3}>
                    <ul className={styles.list}>
                        <li>
                            <a href="/admin">Estatísticas</a>
                        </li>
                        <li>
                            <a href="/admin/tokens/new">Novo token</a>
                        </li>
                        <li>
                            <a href="/admin/tokens/import">Importar tokens</a>
                        </li>
                        <li>
                            <a href="/admin/tokens">Listar tokens</a>
                        </li>
                        <li>
                            <a href="/admin/ranking">Ranking</a>
                        </li>
                    </ul>
                </Column>
                <Column lg={10} sm={9}>
                    {children}
                </Column>
            </Grid>
        </section>
    );
}
