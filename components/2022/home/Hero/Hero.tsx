import { useState } from 'react';
import { Player } from '@lottiefiles/react-lottie-player';
import cn from 'classnames';

import DarkModeToggle from './DarkModeToggle';
import { Grid, Column } from '@components/2022/_ui/Grid';
import LinkButton from '@components/2022/_ui/LinkButton/LinkButton';
import { EVENT_PRICE, REGISTER_URL } from '@lib/constants';

import styles from './Hero.module.scss';

export default function Hero() {
    const [isLoading, setIsLoading] = useState(true);

    return (
        <header className={styles.header}>
            <Grid align="center">
                <Column lg={6} sm={7} smOrder={1}>
                    <h1>Be the developer of the future</h1>
                    <span className="headline headline__darker">
                        Online <span className="bullet">•</span> 22, 23 e 24 de Setembro
                    </span>

                    <span className={styles['button__wrapper']}>
                        <LinkButton href={REGISTER_URL} newPage>
                            Inscrições encerradas
                        </LinkButton>
                    </span>

                    <DarkModeToggle />
                </Column>
                <Column lg={6} sm={5} xsmOrder={1}>
                    <span className={cn(styles['image__wrapper'], { [styles.loading]: isLoading })}>
                        <Player
                            autoplay
                            loop
                            onEvent={event => {
                                if (event === 'load') setIsLoading(false);
                            }}
                            src="/animations/2022/hero.json"
                        />
                        <span className={styles.detail} />
                        <span className={styles['detail-two']} />
                    </span>
                </Column>
            </Grid>
        </header>
    );
}
