import Image from 'next/image';
import { Column, Grid } from '../Grid';
import styles from './Header.module.scss';

type Props = {
  title: React.ReactNode;
  image?: string;
  description?: React.ReactNode;
};

export default function Header({ title, description, image }: Props) {
  return (
    <header className={styles.header}>
      <Grid align="center">
        <Column lg={9}>
          <h1 className={styles.hero}>{title}</h1>
          {!!description && <p className={styles.description}>{description}</p>}
        </Column>
        {image && (
          <Column lg={3} sm={0} xsm={0}>
            <Image
              src={image}
              width={320}
              height={320}
              alt="Ícone de ilustração do topo da página"
            />
          </Column>
        )}
      </Grid>
    </header>
  );
}
