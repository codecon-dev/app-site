import cn from 'classnames';

import { Grid, Column } from '@components/_ui/Grid';
import LinkButton from '@components/_ui/LinkButton';

import styles from './ClaimCards.module.scss';

export default function ClaimCards() {
  return (
    <section>
      <Grid>
        <Column lg={4}>
          <div className={styles.card}>
            <h3>
              Um evento? Um jogo?
              <br /> É tudo isso e muito mais
            </h3>
            <p>
              São várias atividades paralelas valendo prêmios, onde você pode provar suas
              habilidades de lógica, destreza e soft skills.
            </p>
            <LinkButton href="/como-funciona">Conheça as atividades</LinkButton>
          </div>
        </Column>
        <Column lg={4}>
          <div className={styles.card}>
            <h3>
              Workshops gratuitos para <br />
              você aprender na prática
            </h3>
            <p>
              São vários workshops com 3 horas de duração para você aprender habilidades novas e
              incrementar seu currículo.
            </p>
            <LinkButton href="/workshops">Veja os workshops</LinkButton>
          </div>
        </Column>
        <Column lg={4}>
          <div className={cn(styles.card, styles['card--last'])}>
            <h3>
              Conecte-se com marcas relevantes
              <br /> da área de tecnologia
            </h3>
            <p>
              Grandes empresas da área de tecnologia estarão presentes no evento com estandes para
              que você possa interagir de verdade.
            </p>
            <LinkButton href="/patrocinadores">Conheça os patrocinadores</LinkButton>
          </div>
        </Column>
      </Grid>
    </section>
  );
}
