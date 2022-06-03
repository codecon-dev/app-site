import Image from 'next/image';

import styles from './About.module.scss';
import { Grid, Column } from '@components/_ui/Grid';

export default function About() {
  return (
    <section className={styles.section}>
      <Grid className={styles.grid}>
        <Column lg={6} sm={5} smOrder={1}>
          <div className={styles['image__wrapper']}>
            <Image
              src="/images/developer.png"
              width={594}
              height={544}
              alt="Programador usando um notebook"
              quality={100}
            />
            <div className={styles['image__badge']}>
              <Image
                src="/images/badge.svg"
                width={238}
                height={238}
                alt="Texto escrito workshops, painéis e palestras"
                quality={100}
              />
            </div>
          </div>
        </Column>
        <Column lg={6} sm={7} xsmOrder={1}>
          <p>
            A Codecon reúne código, diversão e atividades mão na massa em um ambiente virtual onde
            você consegue <strong>de verdade</strong> interagir com outras pessoas.
          </p>

          <div className={styles['second-image__wrapper']}>
            <Image src="/images/gather.png" width={478} height={218} alt="Interações no Gather" />
          </div>
        </Column>
      </Grid>
    </section>
  );
}
