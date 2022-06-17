import Image from 'next/image';

import styles from './Testimonial.module.scss';

export default function Testimonial({ text }: { text: string }) {
  return (
    <article className={styles.testimonial}>
      <p>{text}</p>
      <span className={styles.image}>
        <Image src="/icons/quote.svg" alt="Aspas" width={40} height={40} />
      </span>
    </article>
  );
}
