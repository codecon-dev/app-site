import styles from './Header.module.scss';

type Props = {
  hero: React.ReactNode;
  description?: React.ReactNode;
};

export default function Header({ hero, description }: Props) {
  return (
    <div className={styles.header}>
      <span className={styles.wrapper}>
        <h1 className={styles.hero}>{hero}</h1>
      </span>

      {description && <p className={styles.description}>{description}</p>}
    </div>
  );
}
