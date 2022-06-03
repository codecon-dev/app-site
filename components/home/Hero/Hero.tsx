import Image from 'next/image';

import DarkModeToggle from './DarkModeToggle';
import { Grid, Column } from '@components/_ui/Grid';
import Button from '@components/_ui/Button/Button';
import { EVENT_PRICE, REGISTER_URL } from '@lib/constants';

import styles from './Hero.module.scss';

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
            <Button price={EVENT_PRICE} href={REGISTER_URL} newPage>
              Inscreva-se
            </Button>
          </span>

          <DarkModeToggle />
        </Column>
        <Column lg={6} xsmOrder={1}>
          <span className={styles['image__wrapper']}>
            <Image src="/images/hero.png" alt="Hero" width={590} height={587} quality={100} />
          </span>
        </Column>
      </Grid>
    </section>
  );
}
