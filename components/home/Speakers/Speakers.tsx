import Image from 'next/image';
import Link from 'next/link';

import { Grid, Column } from '@components/_ui/Grid';
import LinkButton from '@components/_ui/LinkButton';

import styles from './Speakers.module.scss';

export default function Gather() {
  return (
    <section>
      <Grid>
        <Column lg={7}>
          <h2>São mais de 20 palestras e painéis com os principais nomes da área</h2>
        </Column>
      </Grid>
      <Grid>
        <Column lg={3}>asdasdas</Column>
      </Grid>
    </section>
  );
}
