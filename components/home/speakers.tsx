import cn from 'classnames';
import Tilt from 'vanilla-tilt';
import { useRef, useEffect, useState } from 'react';
import styleUtils from '../utils.module.css';
import styles from './speakers.module.css';

export default function Speakers() {
    const imageRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (imageRef.current && !window.matchMedia('(pointer: coarse)').matches) {
          Tilt.init(imageRef.current, {
            glare: true,
            max: 5,
            'max-glare': 0.16,
            'full-page-listening': true
          });
        }
      }, [imageRef]);

    return (
        <div className={styles.wrapper}>
            <div className={cn(
                styleUtils.appear,
                styleUtils['appear-sixth'],
                styles.container
            )}>
            
            <div className={styles['img-wrapper']}>
                <div ref={imageRef}>
                    <img src="/todos-palestrantes.png" alt="Palestrantes - Codecon 2021" />
                </div>
            </div>

            <div className={styles['txt-wrapper']}>
                <h2>9 palestrantes f*das em transmissões ao vivo pela Twitch, com apresentação da <a target="_blank" href="https://www.twitch.tv/pachicodes">@pachicodes</a></h2>
                <div className={styles['link-wrapper']}>
                    <div className={styles.link}>
                        <a href="/palestras">programação de palestras</a>
                        inscrições gratuitas
                    </div>
                </div>
            </div>

            </div>
        </div>
    );
}
