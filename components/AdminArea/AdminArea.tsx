import cn from 'classnames';

import { Grid, Column } from '@components/_ui/Grid';

import styles from './AdminArea.module.scss';
import Stats from './Stats';

export default function AdminArea() {
    return (
        <section className={cn(styles.section)}>
            <Grid align="start">
                <Column lg={3}>
                    <ul className={styles.list}>
                        <li>
                            <button>Novo token</button>
                        </li>
                        <li>
                            <button>Importar tokens</button>
                        </li>
                        <li>
                            <button>Listar tokens</button>
                        </li>
                        <li>
                            <button>Visualizar ranking</button>
                        </li>
                    </ul>
                </Column>
                <Column lg={9}>
                    <Stats />
                </Column>
            </Grid>
        </section>
    );
}
