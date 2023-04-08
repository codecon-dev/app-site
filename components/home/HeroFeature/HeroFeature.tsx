/* eslint-disable @next/next/no-img-element */
import cn from 'classnames';

import LinkButton from '@components/_ui/LinkButton/LinkButton';

import styles from './HeroFeature.module.scss';
import { getEventData, getActiveEventPrice } from '@lib/constants';

export default function HeroSummit() {
    const eventData = getEventData('feature');
    const { local, city, initialDate, finalDate } = eventData;

    return (
        <header className={cn(styles.header)}>
            <div className={styles['header-wrapper']}>
                <h1 className={styles.title}>
                    Um evento de tecnologia para profissionais em cargos{' '}
                    <span>sênior ou superiores</span>
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
                {getActiveEventPrice(eventData) && (
                    <LinkButton href={eventData.registerUrl} info={getActiveEventPrice(eventData)}>
                        Inscreva-se
                    </LinkButton>
                )}
            </div>
        </header>
    );
}
