import NextImage from 'next/image';
import React, { ReactNode } from 'react';
import cn from 'classnames';
import { useRouter } from 'next/router';

import { addBasePath } from '@lib/utils';
import { Image } from '@lib/types/all';
import LinkButton, { LinkButtonProps } from '../LinkButton';
import OfferedBy from '../OfferedBy';

import styles from './Activity.module.scss';

interface TitleProps extends React.LinkHTMLAttributes<HTMLAnchorElement> {
    children: string;
}

type HeaderProps = {
    children: ReactNode;
};

type FooterProps = {
    children: ReactNode;
};

type ActivityProps = {
    children: ReactNode;
    soon?: boolean;
    featured?: boolean;
    sponsor?: { name: string; logo: Image };
    lunch?: boolean;
};

interface SpeakerImageProps extends React.LinkHTMLAttributes<HTMLAnchorElement> {
    src: string;
    alt: string;
}

const SpeakerImage = ({ src, alt, href = '', ...rest }: SpeakerImageProps) => {
    const router = useRouter();
    const path = addBasePath(router, href);

    return (
        <span className={`${styles.speaker_image} tooltip`} data-content={alt} {...rest}>
            <NextImage src={src} alt={alt} width={48} height={48} />
        </span>
    );
};

const Button = ({ href = '', ...props }: LinkButtonProps) => {
    const router = useRouter();
    const path = addBasePath(router, href);

    return (
        <div className={styles.button}>
            <LinkButton href={path} {...props}>
                {props.children}
            </LinkButton>
        </div>
    );
};

const Footer = ({ children }: FooterProps) => {
    return <footer className={styles.footer}>{children}</footer>;
};

const Header = ({ children }: HeaderProps) => {
    return <header className={styles.header}>{children}</header>;
};

const Title = ({ children, href, ...rest }: TitleProps) => {
    if (!href) {
        <span {...rest} className={styles.title}>
            {children}
        </span>;
    }

    return (
        <a href={href} {...rest} className={styles.title}>
            {children}
        </a>
    );
};

const Activity = ({ children, sponsor, soon, featured, lunch }: ActivityProps) => {
    return (
        <article
            className={cn(styles.activity, {
                [styles.sponsored]: !!sponsor?.name && !!sponsor?.logo,
                [styles.soon]: soon || lunch,
                [styles.featured]: featured
            })}
        >
            {soon || lunch ? (
                <>
                    {soon && <div className={styles.soon}>Em breve!</div>}
                    {lunch && <div className={styles.soon}>Almoço</div>}
                </>
            ) : (
                <>
                    {!!sponsor?.name && !!sponsor?.logo && (
                        <OfferedBy name={sponsor.name} logo={sponsor.logo.url} />
                    )}

                    {featured && <div className={styles.hackathon}>Em destaque</div>}

                    <div className={styles.content}>{children}</div>
                </>
            )}
        </article>
    );
};

Activity.Header = Header;
Activity.Title = Title;
Activity.Footer = Footer;
Activity.SpeakerImage = SpeakerImage;
Activity.Button = Button;

export default Activity;
