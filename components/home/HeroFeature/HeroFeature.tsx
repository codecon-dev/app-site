/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef } from 'react';
import cn from 'classnames';

import AttendeesAvatars from '@components/_ui/AttendeesAvatars/AttendeesAvatars';
import LinkButton from '@components/_ui/LinkButton/LinkButton';

import { getEventData } from '@lib/constants';
import { useActiveEventPrice } from '@lib/hooks/useActiveEventPrice';

import styles from './HeroFeature.module.scss';

export default function HeroSummit() {
    const eventData = getEventData('feature');
    const { local, city, initialDate, finalDate } = eventData;
    const { eventPrice, registerUrlWithCode } = useActiveEventPrice(eventData);
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
                    <LinkButton
                        href={registerUrlWithCode || eventData.registerUrl}
                        info={eventPrice}
                    >
                        Inscreva-se
                    </LinkButton>
                )}
                <AttendeesAvatars />
            </div>

            <div className={styles['video']}>
                <video ref={videoRef} autoPlay muted>
                    <source src="/images/feature/hero/video.mp4" type="video/mp4" />
                </video>
            </div>
        </header>
    );
}
