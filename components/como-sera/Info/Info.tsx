import { ReactNode } from 'react';
import cn from 'classnames';
import NextImage from 'next/image';

import styles from './Info.module.scss';

type PropsText = {
    title: string;
    children: ReactNode;
};

function Text({ title, children }: PropsText) {
    return (
        <article className={cn(styles.text)}>
            <h2>{title}</h2>
            {children}
        </article>
    );
}

type PropsImage = {
    src: string;
};

function Image({ src }: PropsImage) {
    return (
        <span className={styles.image}>
            <NextImage src={src} width={494} height={417} quality={100} alt="" />
        </span>
    );
}

type PropsTestimonial = {
    children: ReactNode;
};

function Testimonial({ children }: PropsTestimonial) {
    return <article className={styles.testimonial}>{children}</article>;
}

type PropsInfo = {
    children: ReactNode;
};

function Info({ children }: PropsInfo) {
    return (
        <section className={styles.info}>
            <div className={cn(styles.grid, 'container')}>{children}</div>
        </section>
    );
}

Info.Text = Text;
Info.Image = Image;
Info.Testimonial = Testimonial;

export default Info;
