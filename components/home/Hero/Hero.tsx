import { useContext } from 'react';
import { Player } from '@lottiefiles/react-lottie-player';
import cn from 'classnames';

import ThemeContext from 'context/ThemeContext';

import DarkModeToggle from '../../_ui/DarkModeToggle';
import { Grid, Column } from '@components/_ui/Grid';
import LinkButton from '@components/_ui/LinkButton/LinkButton';

import styles from './Hero.module.scss';

export default function Hero() {
    const theme = useContext(ThemeContext);

    return (
        <header className={cn(styles.header, styles[`theme-${theme}`])}>
            <Grid align="center">
                <Column lg={6} sm={7} smOrder={1}>
                    <h1>Be the developer of the future</h1>
                    <span className="headline headline__darker">
                        Online <span className="bullet">•</span> 22, 23 e 24 de Setembro
                    </span>

                    <span className={styles['button__wrapper']}>
                        <LinkButton href="" newPage>
                            Inscrições encerradas
                        </LinkButton>
                    </span>

                    <DarkModeToggle />
                </Column>
                <Column lg={6} sm={5} xsmOrder={1}>
                    oioi
                </Column>
            </Grid>
        </header>
    );
}
