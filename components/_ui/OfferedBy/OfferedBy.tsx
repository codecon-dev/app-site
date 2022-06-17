import Image from 'next/image';
import cn from 'classnames';

import styles from './OfferedBy.module.scss';

type Props = {
  logo: string;
  name: string;
  type?: 'white' | 'black';
  whiteLogo?: string;
  offerType?: 'Conteúdo' | 'Experiência' | 'Workshop';
};

export default function OfferedBy({
  logo,
  name,
  type = 'white',
  whiteLogo,
  offerType = 'Conteúdo'
}: Props) {
  return (
    <div className={cn(styles.sponsor, styles[`sponsor-${type}`])}>
      <span>
        <span className={styles.type}>{offerType}</span> oferecid
        {offerType == 'Experiência' ? 'a' : 'o'} por
      </span>
      <div className={styles.image}>
        <Image
          src={type === 'white' ? logo : whiteLogo || logo}
          width={50}
          height={32}
          layout="responsive"
          alt={`Logo da empresa ${name} que está patrocinando esse conteúdo`}
        />
      </div>
    </div>
  );
}
