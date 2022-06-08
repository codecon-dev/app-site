import { Grid, Column } from '@components/_ui/Grid';
import LinkButton from '@components/_ui/LinkButton';

import styles from './Speakers.module.scss';

export default function Speakers() {
  return (
    <section>
      <Grid>
        <Column lg={8}>
          <h2>São mais de 20 palestras e painéis com os principais nomes da área</h2>
        </Column>
      </Grid>
      <Grid>
        <Column lg={3} sm={4}>
          [componente speaker]
        </Column>
        <Column lg={3} sm={4}>
          [componente speaker]
        </Column>
        <Column lg={3} sm={4}>
          [componente speaker]
        </Column>
        <Column lg={3} sm={4} xsm={0}>
          [componente speaker]
        </Column>
        <Column lg={3} sm={4} xsm={0}>
          [componente speaker]
        </Column>
        <Column lg={3} sm={4} xsm={0}>
          [componente speaker]
        </Column>
        <Column lg={3} sm={0} xsm={0}>
          [componente speaker]
        </Column>
        <Column lg={3} sm={0} xsm={0}>
          [componente speaker]
        </Column>
      </Grid>

      <Grid>
        <Column lg={12}>
          <div className={styles.cta}>
            <LinkButton href="/programacao">Programação completa</LinkButton>
          </div>
        </Column>
      </Grid>
    </section>
  );
}
