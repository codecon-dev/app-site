import { ReactNode } from 'react';
import Image from 'next/image';

import styles from './Testimonial.module.scss';

export default function Testimonial({ children }: { children: ReactNode }) {
    return (
        <article className={styles.testimonial}>
            {children}
            <span className={styles.image}>
                <Image src="/icons/2022/quote.svg" alt="Aspas" width={40} height={40} />
            </span>
        </article>
    );
}
