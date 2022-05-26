import Button from '@components/_ui/Button';

import styles from './Alert.module.scss';

type Props = {
  title: string;
  description: string;
  children?: React.ReactNode;
  buttonText?: string;
  buttonHref?: string;
};

export default function Alert({ title, description, children, buttonText, buttonHref }: Props) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.cont}>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>

        <div className={styles.cont}>
          {children && children}

          {buttonText && buttonHref && (
            <Button newPage type="tertiary" href={buttonHref}>
              {buttonText}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
