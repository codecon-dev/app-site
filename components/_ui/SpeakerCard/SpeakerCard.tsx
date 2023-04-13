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
import React from 'react';
import { useRouter } from 'next/router';
import { addBasePath } from '@lib/utils';

const Title = ({ children }: PropsTitle) => {
    return (
        <div className={styles.title}>
            <h5>{children}</h5>
        </div>
    );
};

const Image = ({ src, alt, isHost, width = 600, height = 600, ...rest }: PropsImage) => {
    return (
        <div className={styles.image_wrapper} {...rest}>
            <NextImage src={src} alt={alt} width={width} height={height} />
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
                                <div>{React.cloneElement(Icon, { color: 'black' })}</div>
                            </a>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

const SpeakerCard = ({ children, href = '', ...rest }: PropsSpeakerCard) => {
    const router = useRouter();
    const path = addBasePath(router, href);
    return (
        <Link href={path}>
            <div className={styles.speaker_card} {...rest}>
                {children}
            </div>
        </Link>
    );
};

SpeakerCard.Title = Title;
SpeakerCard.Image = Image;
SpeakerCard.About = About;
SpeakerCard.Social = Social;

export default SpeakerCard;
