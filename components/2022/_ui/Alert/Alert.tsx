import LinkButton from '@components/2022/_ui/LinkButton';

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
                        <LinkButton newPage href={buttonHref}>
                            {buttonText}
                        </LinkButton>
                    )}
                </div>
            </div>
        </div>
    );
}
