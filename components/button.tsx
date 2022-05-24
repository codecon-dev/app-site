import Link from 'next/link';
import styles from './button.module.css';
import cn from 'classnames';

 export default function Cta({ title, url, isYellow, blank }: { title: string, url: string, isYellow?: boolean, blank?: boolean}) {
    return (
        <div className={styles.container}>
            <Link href={url}>
                <a target={ blank ? '_blank' : undefined}  rel="noopener noreferrer" className={cn(styles.button, {
                    [styles.isYellow]: isYellow
                })}>
                    {title}
                </a>
            </Link>
        </div>
    );
 }
 