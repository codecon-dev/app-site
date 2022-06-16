import NextImage from 'next/image';
import React, { ReactNode } from 'react';
import styles from './Activity.module.scss';
import LinkButton, { LinkButtonProps } from '../LinkButton';

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
  sponsor?: { name: string; logo: string };
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
  return <div className={styles.header}>{children}</div>;
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
    <div className={styles.activity}>
      {!!sponsor?.name && !!sponsor?.logo && (
        <div className={styles.sponsor}>
          <span>Conteúdo oferecido por</span>
          <div>
            <NextImage
              src={sponsor.logo}
              width={32}
              height={32}
              layout="responsive"
              alt={`Logo da empresa ${sponsor.name} que está patrocinando esse conteúdo`}
            />
          </div>
        </div>
      )}

      <div className={styles.content}>{children}</div>
    </div>
  );
};

Activity.Header = Header;
Activity.Title = Title;
Activity.Footer = Footer;
Activity.SpeakerImage = SpeakerImage;
Activity.Button = Button;

export default Activity;
