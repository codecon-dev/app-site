import { useEffect, useState } from 'react';
import Image from 'next/image';
import cn from 'classnames';

import { EventData } from '@lib/constants';
import { useActiveEventPrice } from '@lib/hooks/useActiveEventPrice';

import LinkButton from '@components/_ui/LinkButton';

import styles from './SubscribeCountdown.module.scss';

type Props = {
    eventData: EventData;
};

type CountdownNumbers = {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
};

export default function SubscribeCountdown({ eventData }: Props) {
    const [countdownNumbers, setCountdownNumbers] = useState<CountdownNumbers | undefined>();
    const { eventPrice, registerUrlWithCode, discountInfo, priceInfo, nextPrice } =
        useActiveEventPrice(eventData);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isClosed, setIsClosed] = useState(false);

    useEffect(() => {
        window.addEventListener('scroll', () => {
            const documentHeight = document.body.scrollHeight;
            const currentScroll = window.scrollY + window.innerHeight;
            const modifier = 50;
            if (currentScroll + modifier > documentHeight) {
                setIsScrolled(false);
            } else if (window.scrollY > 100) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        });
    }, []);

    useEffect(() => {
        const countdownInterval = setInterval(function () {
            const initialDateTime = priceInfo?.endDate.getTime();
            const today = new Date().getTime();

            if (!initialDateTime) {
                return;
            }

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
    }, [priceInfo?.endDate]);

    return (
        <>
            {countdownNumbers && (
                <div className={cn(styles.countdown, { [styles.scroll]: isScrolled && !isClosed })}>
                    <div className={styles.content}>
                        <button onClick={() => setIsClosed(true)} className={styles.close}>
                            Fechar
                        </button>
                        {discountInfo && (
                            <img
                                src={discountInfo.image}
                                width={64}
                                height={64}
                                alt={discountInfo.name}
                                className={styles.image}
                            />
                        )}
                        <div>
                            <span className={styles.title}>
                                Aproveite o valor do {priceInfo?.name}{' '}
                                {discountInfo && (
                                    <span className={styles.mobile}> com desconto</span>
                                )}
                            </span>
                            {discountInfo ? (
                                <p className={styles.info}>
                                    <svg
                                        width="24"
                                        height="24"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                    >
                                        <path
                                            fill="var(--color-primary)"
                                            d="M6 18h12c3.311 0 6-2.689 6-6s-2.689-6-6-6h-12.039c-3.293.021-5.961 2.701-5.961 6 0 3.311 2.688 6 6 6zm12-10c-2.208 0-4 1.792-4 4s1.792 4 4 4 4-1.792 4-4-1.792-4-4-4z"
                                        />
                                    </svg>{' '}
                                    Desconto ativado! {discountInfo?.name} (
                                    {discountInfo?.percentage}%)
                                </p>
                            ) : (
                                <>
                                    {nextPrice ? (
                                        <p className={styles.info}>
                                            O valor vai aumentar de R$
                                            {new Intl.NumberFormat('pt-BR').format(
                                                eventPrice || 0
                                            )}{' '}
                                            para R$
                                            {new Intl.NumberFormat('pt-BR').format(nextPrice || 0)}.
                                        </p>
                                    ) : (
                                        <p className={styles.info}>Últimas vagas disponíveis!</p>
                                    )}
                                </>
                            )}
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
                        <div className={styles.button}>
                            <LinkButton info={eventPrice} href={registerUrlWithCode || ''}>
                                Comprar
                            </LinkButton>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
