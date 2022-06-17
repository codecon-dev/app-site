import NextImage from 'next/image';
import React, { ReactNode } from 'react';
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
  sponsor?: { name: string; logo: Image };
};

interface SpeakerImageProps extends React.LinkHTMLAttributes<HTMLAnchorElement> {
  src: string;
  alt: string;
}

const SpeakerImage = ({ src, alt, ...rest }: SpeakerImageProps) => {
  return (
    <a className={styles.speaker_image} {...rest}>
      <NextImage src={src} alt={alt} width={32} height={32} layout="responsive" />
    </a>
  );
};

const Button = (props: LinkButtonProps) => {
  return (
    <div className={styles.button}>
      <LinkButton {...props}>Saiba mais</LinkButton>
    </div>
  );
};

const Footer = ({ children }: FooterProps) => {
  return <footer className={styles.footer}>{children}</footer>;
};

const Header = ({ children }: HeaderProps) => {
  return <header className={styles.header}>{children}</header>;
};

const Title = ({ children, ...rest }: TitleProps) => {
  return (
    <a {...rest} className={styles.title}>
      {children}
    </a>
  );
};

const Activity = ({ children, sponsor }: ActivityProps) => {
  return (
    <article className={styles.activity}>
      {!!sponsor?.name && !!sponsor?.logo && <OfferedBy name={sponsor.name} logo={sponsor.logo} />}

      <div className={styles.content}>{children}</div>
    </article>
  );
};

Activity.Header = Header;
Activity.Title = Title;
Activity.Footer = Footer;
Activity.SpeakerImage = SpeakerImage;
Activity.Button = Button;

export default Activity;
