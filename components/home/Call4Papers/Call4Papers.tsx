import { Grid, Column } from '@components/_ui/Grid';
import LinkButton from '@components/_ui/LinkButton';

import styles from './Call4Papers.module.scss';

export default function Call4Papers() {
    return (
        <section>
            <Grid>
                <Column lg={12}>
                    <div className={styles.call4papers}>
                        <div>
                            <h3>Call4Papers</h3>
                            <p>Quer palestrar na Codecon? Envie uma sugestão de palestra!</p>
                        </div>
                        <div className={styles.button}>
                            <LinkButton href="https://tally.so/r/w5X0GM" type="secondary">
                                Enviar sugestão
                            </LinkButton>
                        </div>
                    </div>
                </Column>
            </Grid>
        </section>
    );
}
