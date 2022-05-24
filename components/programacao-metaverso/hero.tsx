import classNames from 'classnames';
import Link from 'next/link';
import styles from '../home/hero.module.css';
import Newsletter from './newsletter';

export default function Hero() {
  return (
    <div className={styles.container}>
      <p className={styles.text}>
        Queremos contribuir com a área de desenvolvimento por meio de projetos que possibilitam o
        compartilhamento de conteúdo e a interação entre membros da comunidade dev, sempre de forma{' '}
        <strong>
          <u>leve e descontraída</u>
        </strong>
        .
      </p>
      <Newsletter />
    </div>
  );
}
