import Image from 'next/image';

import Button from '@components/_ui/Button/Button';

import styles from './About.module.scss';
import { Grid, Column } from '@components/_ui/Grid';
import { REGISTER_URL } from '@lib/constants';

export default function About() {
  return (
    <section className={styles.section}>
      <Grid align="center">
        <Column lg={6}></Column>
        <Column lg={6} xsmOrder={1}></Column>
      </Grid>
    </section>
  );
}
