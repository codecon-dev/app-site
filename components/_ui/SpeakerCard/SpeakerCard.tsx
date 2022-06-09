import NextImage from 'next/image';

import Icons from './Icons';
import styles from './Speaker.module.scss';
import { PropsAbout, PropsImage, PropsSocial, PropsSpeakerCard, PropsTitle } from './types';

const Title = ({ children }: PropsTitle) => {
  return (
    <div className={styles.title}>
      <h5>{children}</h5>
    </div>
  );
};

const Image = ({ src, alt }: PropsImage) => {
  return (
    <div className={styles.image_wrapper}>
      <NextImage src={src} alt={alt} width={600} height={600} layout="responsive" />
    </div>
  );
};

const About = ({ children }: PropsAbout) => {
  return <div className={styles.about}>{children}</div>;
};

const Social = ({ data, character: { src, alt } }: PropsSocial) => {
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
        <li>
          <NextImage src={src} alt={alt} width={65} height={100} />
        </li>
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
