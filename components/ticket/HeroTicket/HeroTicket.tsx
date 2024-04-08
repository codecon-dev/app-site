import { useContext, useRef, useEffect } from 'react';
import cn from 'classnames';
import Tilt from 'vanilla-tilt';

import Attendee from 'src/database/model/Attendee';
import ThemeContext from 'context/ThemeContext';
import { useActiveEventPrice } from '@lib/hooks/useActiveEventPrice';
import { EventData, useEventData } from '@lib/constants';
import { Grid, Column } from '@components/_ui/Grid';
import LinkButton from '@components/_ui/LinkButton';

import TheTicket from '../TheTicket';

import styles from './HeroTicket.module.scss';
import Link from 'next/link';
import { Col } from 'sequelize/types/utils';

type Props = {
    attendee: Attendee;
};

type EventInfoProps = {
    attendee: Attendee;
    eventData: EventData;
};

function EventInfo({ attendee, eventData }: EventInfoProps) {
    const { title, local, city, initialDate, finalDate } = eventData;

    return (
        <>
            <h2>
                <span>{attendee.name}</span> estará na {title}
            </h2>
            <p className={styles.date}>
                {local} <span>&bull;</span> {city} <span>&bull;</span>{' '}
                {initialDate && initialDate.getDate()} {finalDate && `e ${finalDate.getDate()}`} de{' '}
                {initialDate &&
                    initialDate.toLocaleString('pt-BR', {
                        month: 'long',
                        timeZone: 'America/Sao_Paulo'
                    })}
            </p>
        </>
    );
}

export default function AttendeeArea({ attendee }: Props) {
    const theme = useContext(ThemeContext);
    const eventData = useEventData(theme);
    const ticketRef = useRef<HTMLDivElement>(null);
    const { subtitle, registerUrl, homeUrl } = eventData;
    const { eventPrice } = useActiveEventPrice(eventData);

    useEffect(() => {
        if (ticketRef.current && !window.matchMedia('(pointer: coarse)').matches) {
            Tilt.init(ticketRef.current, {
                max: 10,
                'full-page-listening': true
            });
        }
    }, [ticketRef]);

    return (
        <section className={cn(styles.section, styles[`theme-${theme}`])}>
            <Grid align="center">
                <Column lg={2} />
                <Column lg={8}>
                    <div className={styles.ticket} ref={ticketRef}>
                        <TheTicket
                            name={attendee.githubFullName || attendee.name}
                            username={attendee.githubUsername}
                            number={attendee.id}
                        />
                    </div>
                </Column>
                <Column lg={2} />
            </Grid>
            <Grid>
                <Column lg={2} />

                <Column lg={8}>
                    <div className={styles.content}>
                        <EventInfo attendee={attendee} eventData={eventData} />
                        <p className="headline">{subtitle}</p>

                        <div className={styles.buttons}>
                            <LinkButton href={registerUrl}>Inscreva-se</LinkButton>
                        </div>
                    </div>
                </Column>

                <Column lg={2} />
            </Grid>
        </section>
    );
}
