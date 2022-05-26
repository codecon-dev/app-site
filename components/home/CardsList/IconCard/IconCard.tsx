import Button from '@components/_ui/Button';
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
      <img src={`/icon-${iconName}.png`} alt={title} />
      <h2 className={styles.title}>{title}</h2>
      <p>{description}</p>

      <Button newPage href={buttonHref}>
        {buttonText}
      </Button>
    </div>
  );
}
