import NextImage from 'next/image';

import Icons from './Icons';
import styles from './Speaker.module.scss';
import {
  PropsAbout,
  PropsImage,
  PropsSocial,
  PropsSpeakerCard,
  PropsTitle
} from '@lib/types/speakers';
import Link from 'next/link';

const Title = ({ children }: PropsTitle) => {
  return (
    <div className={styles.title}>
      <h5>{children}</h5>
    </div>
  );
};

const Image = ({ href, src, alt }: PropsImage) => {
  return (
    <div className={styles.image_wrapper}>
      <Link href={href}>
        <a>
          <NextImage src={src} alt={alt} width={600} height={600} layout="responsive" />
        </a>
      </Link>
    </div>
  );
};

const About = ({ children }: PropsAbout) => {
  return <div className={styles.about}>{children}</div>;
};

const Social = ({ data, character }: PropsSocial) => {
  if (!data) return null;

  return (
    <div className={styles.social}>
      <ul>
        {data.map(({ label, url }) => {
          const Icon = Icons[label];

          return (
            <li key={label}>
              <a href={url}>
                <div>{Icon}</div>
              </a>
            </li>
          );
        })}
        {!!character && (
          <li>
            <NextImage src={character.src} alt={character.alt} width={48} height={73} />
          </li>
        )}
      </ul>
    </div>
  );
};

const SpeakerCard = ({ children }: PropsSpeakerCard) => {
  return <div className={styles.speaker_card}>{children}</div>;
};

SpeakerCard.Title = Title;
SpeakerCard.Image = Image;
SpeakerCard.About = About;
SpeakerCard.Social = Social;

export default SpeakerCard;
