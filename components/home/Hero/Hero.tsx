import Image from 'next/image';
import { Player } from '@lottiefiles/react-lottie-player';

import LinkButton from '@components/_ui/LinkButton/LinkButton';

import styles from './Hero.module.scss';
import { Grid, Column } from '@components/_ui/Grid';
import { REGISTER_URL } from '@lib/constants';

export default function Hero() {
  return (
    <section className={styles.section}>
      <Grid align="center">
        <Column lg={6}>
          <h1>Be the developer of the future</h1>
          <span className="headline headline__darker">
            Online <span className="bullet">•</span> 22, 23 e 24 de Setembro
          </span>

          <span className={styles['button__wrapper']}>
            <LinkButton price={20} href={REGISTER_URL} newPage>
              Inscreva-se
            </LinkButton>
          </span>
        </Column>
        <Column lg={6} xsmOrder={1}>
          <span className={styles['image__wrapper']}>
            <Player autoplay loop src="/animations/hero.json" />
          </span>
        </Column>
      </Grid>
    </section>
  );
}
