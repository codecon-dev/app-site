/* eslint-disable @next/next/no-img-element */
import cn from 'classnames';

import LinkButton from '@components/_ui/LinkButton/LinkButton';

import styles from './HeroFeature.module.scss';
import { getEventData } from '@lib/constants';

export default function HeroSummit() {
    const eventData = getEventData('feature');

    return (
        <header className={cn(styles.header)}>
            <div className={styles['header-wrapper']}>
                <h1 className={styles.title}>
                    <span>Encode the present,</span> decode the future.
                </h1>
            </div>
            <div className={cn(styles['header-wrapper'], styles.button)}>
                <LinkButton href={eventData.registerUrl} info={eventData.eventPrice}>
                    Inscreva-se
                </LinkButton>
            </div>
        </header>
    );
}
