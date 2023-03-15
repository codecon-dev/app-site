import NextImage from 'next/image';
import cn from 'classnames';

import Icons from './Icons';
import styles from './SpeakerCard.module.scss';
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

const Image = ({ href, src, alt, isHost, width = 600, height = 600, ...rest }: PropsImage) => {
    return (
        <div className={styles.image_wrapper} {...rest}>
            {href ? (
                <Link href={href}>
                    <a>
                        <NextImage src={src} alt={alt} layout="fill" objectFit="cover" />
                    </a>
                </Link>
            ) : (
                <NextImage src={src} alt={alt} width={width} height={height} layout="responsive" />
            )}
            {isHost && <span className={styles.host}>Host</span>}
        </div>
    );
};

const About = ({ children }: PropsAbout) => {
    return <div className={styles.about}>{children}</div>;
};

const Social = ({ data, horizontal }: PropsSocial) => {
    if (!data) return null;

    return (
        <div
            className={cn(styles.social, {
                [styles.horizontal]: horizontal
            })}
        >
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
            </ul>
        </div>
    );
};

const SpeakerCard = ({ children, ...rest }: PropsSpeakerCard) => {
    return (
        <div className={styles.speaker_card} {...rest}>
            {children}
        </div>
    );
};

SpeakerCard.Title = Title;
SpeakerCard.Image = Image;
SpeakerCard.About = About;
SpeakerCard.Social = Social;

export default SpeakerCard;
