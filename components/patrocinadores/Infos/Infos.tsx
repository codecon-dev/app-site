import cn from 'classnames';

import { Sponsor } from '@lib/types/all';
import { REGISTER_URL } from '@lib/constants';
import { Grid, Column } from '@components/_ui/Grid';
import LinkButton from '@components/_ui/LinkButton';

import styles from './Infos.module.scss';

type Props = {
  sponsor: Sponsor;
};

export default function Infos({ sponsor }: Props) {
  return (
    <section className={cn(styles.section)} style={{ backgroundColor: sponsor.color.hex }}>
      <Grid className={styles.grid}>
        <Column lg={5} sm={6}>
          <h2>Nem Zoom, nem Google Meet, conheça a Z-City</h2>
          <p>
            Uma cidade virtual criada no Gather, inspirada na temática Matrix. Você encontrará salas
            diversas, estandes, pessoas de todo o Brasil e até vários easter eggs.
          </p>
          <LinkButton href="/como-funciona" type="secondary">
            Como funciona
          </LinkButton>
        </Column>
        <Column lg={1} sm={0} xsm={0}></Column>
        <Column lg={5} sm={6}>
          <h2>Um espaço para conversarmos mais</h2>
          <p>
            Apoiamos a comunidade de tecnologia e queremos nos aproximar ainda mais de pessoas
            desenvolvedoras em eventos que tragam conteúdo, networking e muito código.
          </p>
          <LinkButton href={REGISTER_URL} type="secondary">
            Inscreva-se
          </LinkButton>
        </Column>
      </Grid>
    </section>
  );
}
