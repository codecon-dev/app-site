import NextImage from 'next/image';
import { ReactNode } from 'react';
import styles from './Activity.module.scss';

type TitleProps = {
  children: ReactNode;
  as?: React.ElementType;
};

type HeaderProps = {
  children: ReactNode;
};

type ActivityProps = {
  children: ReactNode;
  sponsor?: string;
};

type SpeakerImageProps = {
  src: string;
  alt: string;
};

const SpeakerImage = ({ src, alt, ...rest }: SpeakerImageProps) => {
  return (
    <a className={styles.speaker_image} {...rest}>
      <NextImage src={src} alt={alt} width={32} height={32} layout="responsive" />
    </a>
  );
};

const Footer = ({ children }: HeaderProps) => {
  return <footer className={styles.footer}>{children}</footer>;
};

const Header = ({ children }: HeaderProps) => {
  return <div className={styles.header}>{children}</div>;
};

const Title = ({ children = '', as }: TitleProps) => {
  const Component = as || 'h3';

  return <Component className={styles.title}>{children}</Component>;
};

const Activity = ({ children, sponsor = '' }: ActivityProps) => {
  function getSponsorImage(sponsor = '') {
    const path = `/images/`;
    const images = {
      jetbrains: 'developer.png'
    }[sponsor.toLowerCase()];

    return `${path}${images}`;
  }

  return (
    <div className={styles.activity}>
      {!!sponsor && (
        <div className={styles.sponsor}>
          <span>Conteúdo oferecido por</span>
          <div>
            <NextImage
              src={getSponsorImage(sponsor)}
              width={32}
              height={32}
              layout="responsive"
              alt={`${sponsor} logo`}
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

export default Activity;
