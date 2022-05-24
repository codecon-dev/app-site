import Link from 'next/link';
import styles from './cta.module.css';
import cn from 'classnames';

 export default function Cta({ title, url, link, linkDescription, borderTop }: { title: string, url: string, link?: string, linkDescription?: string, borderTop?: boolean}) {
    return (
        <div className={cn(styles.section, {
            [styles.border]: borderTop
        })}>
            <div className={styles.container}>
                    <Link href={url}>
                        <h3
                            className={cn(styles.title, {
                                [styles['only-title']]: !link
                            })}
                        >
                            {title}
                        </h3>
                    </Link>
                    {link && (
                        <div className={styles['link-container']}>
                            <Link href={url}>
                                <a className={styles.link}>
                                    {link}
                                </a>
                            </Link>
                            {linkDescription && <span className={styles.description}>{linkDescription}</span>}
                        </div>
                    )}
            </div>
        </div>
    );
 }
 