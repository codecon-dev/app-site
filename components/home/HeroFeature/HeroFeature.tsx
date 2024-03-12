/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef } from 'react';
import cn from 'classnames';

import LinkButton from '@components/_ui/LinkButton/LinkButton';

import { useEventData } from '@lib/constants';
import { useActiveEventPrice } from '@lib/hooks/useActiveEventPrice';

import styles from './HeroFeature.module.scss';

export default function HeroSummit() {
    const eventData = useEventData('feature');
    const { local, city, initialDate, finalDate } = eventData;
    const { eventPrice } = useActiveEventPrice(eventData);
    const videoRef = useRef<HTMLVideoElement | null>(null);

    function handlerVideoLoop() {
        setTimeout(function () {
            if (videoRef.current) void videoRef.current.play();
        }, 3000);
    }

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.addEventListener('ended', handlerVideoLoop, false);
        }
    }, []);

    return (
        <header className={cn(styles.header)}>
            <div className={styles['header-wrapper']}>
                <h1 className={styles.title}>
                    Um evento de tecnologia para profissionais em cargos <span>seniores</span>
                </h1>
                <p className={styles.date}>
                    {local} <span>&bull;</span> {city} <span>&bull;</span>{' '}
                    {initialDate && initialDate.getDate()} {finalDate && `e ${finalDate.getDate()}`}{' '}
                    de{' '}
                    {initialDate &&
                        initialDate.toLocaleString('pt-BR', {
                            month: 'long',
                            timeZone: 'America/Sao_Paulo'
                        })}
                </p>
            </div>
            <div className={cn(styles['header-wrapper'], styles.button)}>
                {eventPrice && (
                    <LinkButton href={eventData.registerUrl} info={eventPrice}>
                        Inscreva-se
                    </LinkButton>
                )}

                <div className={styles.sponsors}>
                    Patrocínio
                    <div className={styles['sponsors-list']}>
                        <img src="/images/feature/hero/globo-topo.svg" />
                        <img src="/images/feature/hero/new-relic-topo.svg" />
                        <img src="/images/feature/hero/sigma-topo.svg" />
                    </div>
                </div>
            </div>

            <div className={styles['video']}>
                <video ref={videoRef} autoPlay muted>
                    <source src="/images/feature/hero/video.mp4" type="video/mp4" />
                </video>
            </div>
        </header>
    );
}
