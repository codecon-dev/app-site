import { useContext } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import ThemeContext from 'context/ThemeContext';
import { Talk } from '@lib/types/all';
import { captureHourAndMinutesFromDateString, formatDate } from '@lib/dates';
import { useActiveEventPrice } from '@lib/hooks/useActiveEventPrice';

import { Column, Grid } from '@components/_ui/Grid';
import LinkButton from '@components/_ui/LinkButton';

import styles from './TalkPage.module.scss';
import { useEventData } from '@lib/constants';

type Props = {
    talk: Talk;
};

export default function TalkPage({ talk }: Props) {
    const theme = useContext(ThemeContext);
    const eventData = useEventData(theme);
    const { eventPrice, registerUrlWithCode } = useActiveEventPrice(eventData);

    return (
        <section>
            <Grid align="center">
                <Column lg={1} sm={0} xsm={0} />
                <Column lg={10} sm={12}>
                    <span className="highlight">{talk.talkType}</span>
                    <h1 className={styles.title}>{talk.title}</h1>
                </Column>
            </Grid>
            <Grid align="center">
                <Column lg={1} sm={0} xsm={0} />
                <Column lg={6}>
                    <p className="headline">
                        {formatDate(talk.start, 'dd/MM')} <span className="bullet">•</span>{' '}
                        {captureHourAndMinutesFromDateString(talk.start)} ~{' '}
                        {captureHourAndMinutesFromDateString(talk.end)}{' '}
                        <span className="bullet">•</span> {talk.place}
                    </p>
                </Column>
                <Column lg={4} xsmOrder={1}>
                    {talk.speaker && (
                        <div className={styles.speakers}>
                            {talk.speaker?.map(speaker => (
                                <span className="tooltip" data-content={`${speaker.name}`}>
                                    <Link
                                        href={`/${theme}/quem-vai/${speaker.slug}`}
                                        key={speaker.id}
                                        className={styles.image}
                                    >
                                        <Image src={speaker.image.url} alt={speaker.name} fill />
                                    </Link>
                                </span>
                            ))}
                            {talk.host && (
                                <span className="tooltip" data-content={`[HOST] ${talk.host.name}`}>
                                    <Link
                                        href={`/${theme}/quem-vai/${talk.host.slug}`}
                                        key={talk.host.slug}
                                        className={styles.image}
                                    >
                                        <Image
                                            src={talk.host.image.url}
                                            alt={talk.host.name}
                                            fill
                                        />
                                    </Link>
                                </span>
                            )}
                        </div>
                    )}
                </Column>
            </Grid>
            <Grid>
                <Column lg={2} sm={0} xsm={0} />
                <Column lg={8}>
                    <p className={styles.description}>{talk.description}</p>
                </Column>
            </Grid>

            <div className={styles.buttons}>
                <LinkButton type="secondary" href={`/${theme}/programacao`}>
                    Programação completa
                </LinkButton>

                {eventPrice && (
                    <LinkButton
                        href={registerUrlWithCode || eventData.registerUrl}
                        info={eventPrice}
                    >
                        Inscreva-se
                    </LinkButton>
                )}
            </div>
        </section>
    );
}
