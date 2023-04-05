/* eslint-disable @next/next/no-img-element */
import { useEffect } from 'react';

import cn from 'classnames';

import LinkButton from '@components/_ui/LinkButton/LinkButton';

import styles from './HeroSummit.module.scss';
import { getEventData } from '@lib/constants';

export default function HeroSummit() {
    const eventData = getEventData('summit');

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
                        <img src="/images/summit/hero/8.png" data-parallax="35" />
                        <img src="/images/summit/hero/9.png" data-parallax="5" />
                    </div>
                </div>
            </div>

            <div className={styles['header-wrapper']}>
                <h1 className={styles.title}>
                    <span>Do it for you.</span>
                    <br />
                    Do it by code.
                </h1>

                <LinkButton href={eventData.registerUrl} info={eventData.eventPrice}>
                    Inscreva-se
                </LinkButton>
            </div>
            <div className={cn(styles['image-wrapper'], styles['image-bg'])}>
                <div className={styles['image']}>
                    <div className={cn('parallax-wrap')}>
                        <img src="/images/summit/hero/1.png" data-parallax="0" />
                        <img src="/images/summit/hero/2.png" data-parallax="7" />
                        <img src="/images/summit/hero/3.png" data-parallax="-15" />
                        <img src="/images/summit/hero/4.png" data-parallax="7" />
                        <img src="/images/summit/hero/5.png" data-parallax="0" />
                        <img src="/images/summit/hero/6.png" data-parallax="14" />
                        <img src="/images/summit/hero/7.png" data-parallax="-6" />
                    </div>
                </div>
            </div>

            <img src="/images/summit/hero/banner-mobile.png" className={styles['image-mobile']} />
        </header>
    );
}