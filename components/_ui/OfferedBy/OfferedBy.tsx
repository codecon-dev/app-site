import Image from 'next/image';
import cn from 'classnames';

import styles from './OfferedBy.module.scss';

type Props = {
  logo: string;
  name: string;
  isBlackBg?: boolean;
  type?: 'white' | 'black';
  offerType?: 'Conteúdo' | 'Experiência' | 'Workshop';
};

export default function OfferedBy({ logo, name, isBlackBg, offerType = 'Conteúdo' }: Props) {
  return (
    <div className={cn(styles.sponsor, { [styles[`sponsor-black`]]: isBlackBg })}>
      <span>
        <span className={styles.type}>{offerType}</span> oferecid
        {offerType == 'Experiência' ? 'a' : 'o'} por
      </span>
      <div className={styles.image}>
        <Image
          src={logo}
          width={50}
          height={32}
          layout="responsive"
          alt={`Logo da empresa ${name} que está patrocinando esse conteúdo`}
        />
      </div>
    </div>
  );
}
