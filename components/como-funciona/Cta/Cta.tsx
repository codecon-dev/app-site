import { useContext } from 'react';

import ThemeContext from 'context/ThemeContext';

import { Column, Grid } from '@components/_ui/Grid';
import LinkButton from '@components/_ui/LinkButton';
import { getEventData } from '@lib/constants';
import Testimonial from '../Testimonial';

import styles from './Cta.module.scss';

export default function Cta() {
    const theme = useContext(ThemeContext);
    const eventData = getEventData(theme);

    return (
        <section>
            <Grid align="center">
                <Column lg={5} sm={6}>
                    <Testimonial>
                        <p>
                            Gostei muito do uso do Gather no evento, trouxe muito da experiência de
                            um evento presencial com as conversas de corredor, stands e networking,
                            além dos minigames que foram fenomenais. Eu adorei o evento e já estou
                            com saudades.
                        </p>
                    </Testimonial>
                </Column>
                <Column lg={2} sm={0} xsm={0} />
                <Column lg={5} sm={6}>
                    <h2 className={styles.title}>Be the developer of the future</h2>
                    <span className="headline headline__darker">
                        Online <span className="bullet">•</span> 22, 23 e 24 de Setembro
                    </span>
                    <span className={styles['button-wrapper']}>
                        <LinkButton href={eventData.registerUrl} newPage>
                            Inscrições encerradas
                        </LinkButton>
                    </span>
                </Column>
            </Grid>
        </section>
    );
}
