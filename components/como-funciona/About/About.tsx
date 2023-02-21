import { Column, Grid } from '@components/_ui/Grid';
import Testimonial from '../Testimonial';

import styles from './About.module.scss';

export default function About() {
    return (
        <section className={styles.section}>
            <Grid align="center">
                <Column lg={5} className={styles.content}>
                    <h2>Uma experiência imersiva em pixel art</h2>
                    <p>
                        Uma cidade inteira em 16bits repleta de easter eggs, referências à saga
                        Matrix, estandes de patrocinadores, salas de conteúdo e muitas outras
                        surpresas.{' '}
                    </p>
                    <p>
                        Uma experiência incrível onde você nem vai perceber a hora passar e vai se
                        divertir de monte.
                    </p>
                </Column>
                <Column lg={2} />
                <Column lg={5}>
                    <Testimonial>
                        <p>
                            Foi o melhor evento que participei na pandemia, muito mais interativo e
                            "humanizado", deu para ter aquela experiência de "andar à toa" e
                            conhecer gente, e parar e entrar em salas e assistir as palestras.
                        </p>
                    </Testimonial>
                </Column>
            </Grid>
        </section>
    );
}
