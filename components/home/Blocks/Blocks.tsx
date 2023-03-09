import { ReactNode, useEffect, useState } from 'react';
import cn from 'classnames';

import Grid from '@components/_ui/Grid/Grid';
import Column, { Props as ColumnProps } from '@components/_ui/Grid/Column';

import styles from './Blocks.module.scss';
import { useMediaQuery } from '@material-ui/core';

type PropsCountdown = {
    message: string;
    local: string;
    city: string;
    initialDate: Date;
    finalDate?: Date;
};

type CountdownNumbers = {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
};

const Countdown = ({ message, local, city, initialDate, finalDate }: PropsCountdown) => {
    const initialDateTime = initialDate.getTime();
    const [countdownNumbers, setCountdownNumbers] = useState<CountdownNumbers | undefined>();

    useEffect(() => {
        const countdownInterval = setInterval(function () {
            const today = new Date().getTime();

            const difference = initialDateTime - today;

            if (difference < 0) {
                clearInterval(countdownInterval);
                setCountdownNumbers(undefined);
                return;
            }

            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);

            setCountdownNumbers({ days, hours, minutes, seconds });
        }, 1000);

        return () => clearInterval(countdownInterval);
    }, [initialDateTime]);

    return (
        <>
            {countdownNumbers && (
                <Column lg={12}>
                    <div className={cn(styles.countdown, styles.block)}>
                        <div>
                            <h3>{message}</h3>
                            <p>
                                {local} <span>&bull;</span> {city} <span>&bull;</span>{' '}
                                {initialDate.getDate()} {finalDate && `e ${finalDate.getDate()}`} de{' '}
                                {initialDate.toLocaleString('pt-BR', {
                                    month: 'long',
                                    timeZone: 'America/Sao_Paulo'
                                })}
                            </p>
                        </div>
                        <div className={styles.numbers}>
                            <span>
                                <strong>{countdownNumbers.days}</strong> dias
                            </span>
                            <span>
                                <strong>{countdownNumbers.hours}</strong> horas
                            </span>
                            <span>
                                <strong>{countdownNumbers.minutes}</strong> minutos
                            </span>
                            <span>
                                <strong>{countdownNumbers.seconds}</strong> segundos
                            </span>
                        </div>
                    </div>
                </Column>
            )}
        </>
    );
};

type PropsBlock = {
    title?: string;
    description?: string;
    backgroundImageMobile?: string;
    backgroundImage: string;
};

const Block = ({
    title,
    description,
    backgroundImageMobile,
    backgroundImage,
    lg,
    sm,
    xsm
}: PropsBlock & ColumnProps) => {
    const isMobile = useMediaQuery('only screen and (max-width: 1200px)');

    return (
        <Column lg={lg} sm={sm} xsm={xsm}>
            <div
                className={cn(styles.block, styles[`block-lg-${lg}`])}
                style={{
                    backgroundImage: `url('${
                        isMobile && backgroundImageMobile ? backgroundImageMobile : backgroundImage
                    }')`
                }}
            >
                {isMobile}
                {title && <h3>{title}</h3>}
                {description && <p>{description}</p>}
            </div>
        </Column>
    );
};

type PropsVideo = {
    code: string;
};

const Video = ({ code }: PropsVideo) => {
    return (
        <Column lg={12}>
            <div className={cn(styles.block, styles.video)}>
                <div className={styles['video-wrapper']}>
                    <iframe
                        width="560"
                        height="315"
                        src={`https://www.youtube-nocookie.com/embed/${code}?rel=0&hd=1`}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                    ></iframe>
                </div>
            </div>
        </Column>
    );
};

type PropsBlocks = {
    children: ReactNode;
};

const Blocks = ({ children, ...rest }: PropsBlocks) => {
    return (
        <div className={cn(styles.blocks)} {...rest}>
            <Grid>{children}</Grid>
        </div>
    );
};

Blocks.Countdown = Countdown;
Blocks.Block = Block;
Blocks.Video = Video;

export default Blocks;
