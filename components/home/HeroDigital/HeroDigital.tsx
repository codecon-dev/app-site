/* eslint-disable @next/next/no-img-element */
import { useEffect } from 'react';

import cn from 'classnames';
import { useEventData } from '@lib/constants';

import styles from './HeroDigital.module.scss';

export default function HeroDigital() {
    const eventData = useEventData('digital');
    const { local, city, initialDate, finalDate } = eventData;

    useEffect(() => {
        document.addEventListener('mousemove', event => {
            document.querySelectorAll('.parallax-wrap img').forEach(el => {
                if (el instanceof HTMLElement) {
                    const position: any = el.dataset.parallax;

                    if (!position) return;

                    const x = (window.innerWidth - event.pageX * position) / 500;
                    const y = (window.innerHeight - event.pageY * position) / 500;

                    el.style.transform = `perspective(500px) translateZ(${y}px) translateX(${x}px) translateY(${y}px)`;
                }
            });
        });
    }, []);

    return (
        <header className={cn(styles.header)}>
            <div className={cn(styles['image-wrapper'])}>
                <div className={styles['image']}>
                    <div className={cn(styles['image-animated'], 'parallax-wrap')}>
                        <img src="/images/digital/hero/digital-bg-9.png" data-parallax="35" />
                        <img src="/images/digital/hero/digital-bg-10.png" data-parallax="10" />
                    </div>
                </div>
            </div>

            <div className={styles['header-wrapper']}>
                <h1 className={styles.title}>
                    O maior festival online de tecnologia, <span>código</span> e inovação
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
                <p>O evento já aconteceu!</p>
            </div>

            <div className={cn(styles['image-wrapper'], styles['image-bg'])}>
                <div className={styles['image']}>
                    <div className={cn('parallax-wrap')}>
                        <img src="/images/digital/hero/digital-bg-1.png" data-parallax="-6" />
                        <img src="/images/digital/hero/digital-bg-2.png" data-parallax="-4" />
                        <img src="/images/digital/hero/digital-bg-3.png" data-parallax="5" />
                        <img src="/images/digital/hero/digital-bg-4.png" data-parallax="7" />
                        <img src="/images/digital/hero/digital-bg-5.png" data-parallax="-5" />
                        <img src="/images/digital/hero/digital-bg-6.png" data-parallax="7" />
                        <img src="/images/digital/hero/digital-bg-7.png" data-parallax="-7" />
                    </div>
                    <img src="/images/digital/hero/digital-bg-8.png" />
                </div>
            </div>

            <img src="/images/digital/hero/banner-mobile.png" className={styles['image-mobile']} />
        </header>
    );
}
