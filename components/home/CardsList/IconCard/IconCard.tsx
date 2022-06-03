import Image from 'next/image';

import LinkButton from '@components/_ui/LinkButton';
import styles from './IconCard.module.css';

type Props = {
  iconName: string;
  title: string;
  description: string;
  buttonText: string;
  buttonHref: string;
};

export default function IconCard({ iconName, title, description, buttonText, buttonHref }: Props) {
  return (
    <div className={styles.card}>
      <Image width={40} height={40} src={`/icon-${iconName}.png`} alt={title} />
      <h2 className={styles.title}>{title}</h2>
      <p>{description}</p>

      <LinkButton newPage href={buttonHref}>
        {buttonText}
      </LinkButton>
    </div>
  );
}
