/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef } from 'react';

import Image from 'next/image';
import cn from 'classnames';
import Tilt from 'vanilla-tilt';

import { Grid, Column } from '@components/_ui/Grid';
import LinkButton from '@components/_ui/LinkButton/LinkButton';

import styles from './HeroDigital.module.scss';
import { getEventData } from '@lib/constants';
import HeroBg1 from 'public/images/hero-digital/digital-bg-1.png';
import HeroBg2 from 'public/images/hero-digital/digital-bg-2.png';
import HeroBg3 from 'public/images/hero-digital/digital-bg-3.png';
import HeroBg4 from 'public/images/hero-digital/digital-bg-4.png';
import HeroBg5 from 'public/images/hero-digital/digital-bg-5.png';
import HeroBg6 from 'public/images/hero-digital/digital-bg-6.png';
import HeroBg7 from 'public/images/hero-digital/digital-bg-7.png';
import HeroBg8 from 'public/images/hero-digital/digital-bg-8.png';
import HeroBg9 from 'public/images/hero-digital/digital-bg-9.png';
import HeroBg10 from 'public/images/hero-digital/digital-bg-10.png';

export default function HeroDigital() {
    const eventData = getEventData('digital');
    const illustrationRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (illustrationRef.current && !window.matchMedia('(pointer: coarse)').matches) {
            Tilt.init(illustrationRef.current, {
                max: 10,
                'full-page-listening': true
            });
        }
    }, [illustrationRef]);

    return (
        <header className={cn(styles.header)}>
            <Grid align="center">
                <Column lg={8} sm={7} smOrder={1}>
                    <h1 className={styles.title}>
                        <span>Adventures</span> in the world of development
                    </h1>
                    <LinkButton href={eventData.registerUrl} info={eventData.eventPrice}>
                        Inscreva-se
                    </LinkButton>
                </Column>
            </Grid>

            <div className={styles['image-wrapper']}>
                <div className={styles['image']} ref={illustrationRef}>
                    <img
                        className={styles['image-src']}
                        src="/images/hero-digital/digital-bg-1.png"
                    />
                    <img
                        className={styles['image-src']}
                        src="/images/hero-digital/digital-bg-2.png"
                    />
                    <img
                        className={styles['image-src']}
                        src="/images/hero-digital/digital-bg-3.png"
                    />
                    <img
                        className={styles['image-src']}
                        src="/images/hero-digital/digital-bg-4.png"
                    />
                    <img
                        className={styles['image-src']}
                        src="/images/hero-digital/digital-bg-5.png"
                    />
                    <img
                        className={styles['image-src']}
                        src="/images/hero-digital/digital-bg-6.png"
                    />
                    <img
                        className={styles['image-src']}
                        src="/images/hero-digital/digital-bg-7.png"
                    />
                    <img
                        className={styles['image-src']}
                        src="/images/hero-digital/digital-bg-8.png"
                    />
                    <img
                        className={styles['image-src']}
                        src="/images/hero-digital/digital-bg-9.png"
                    />
                    <img
                        className={styles['image-src']}
                        src="/images/hero-digital/digital-bg-10.png"
                    />
                </div>
            </div>
        </header>
    );
}
