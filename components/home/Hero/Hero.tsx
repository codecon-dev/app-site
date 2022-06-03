import { Player } from '@lottiefiles/react-lottie-player';

import DarkModeToggle from './DarkModeToggle';
import { Grid, Column } from '@components/_ui/Grid';
import LinkButton from '@components/_ui/LinkButton/LinkButton';
import { EVENT_PRICE, REGISTER_URL } from '@lib/constants';

import styles from './Hero.module.scss';

export default function Hero() {
  return (
    <section className={styles.section}>
      <Grid align="center">
        <Column lg={6} sm={7} smOrder={1}>
          <h1>Be the developer of the future</h1>
          <span className="headline headline__darker">
            Online <span className="bullet">•</span> 22, 23 e 24 de Setembro
          </span>

          <span className={styles['button__wrapper']}>
            <LinkButton price={EVENT_PRICE} href={REGISTER_URL} newPage>
              Inscreva-se
            </LinkButton>
          </span>

          <DarkModeToggle />
        </Column>
        <Column lg={6} sm={5} xsmOrder={1}>
          <span className={styles['image__wrapper']}>
            <Player autoplay loop src="/animations/hero.json" />
          </span>
        </Column>
      </Grid>
    </section>
  );
}
