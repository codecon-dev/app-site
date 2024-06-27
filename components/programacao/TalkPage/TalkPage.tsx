import { useContext } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import ThemeContext from 'context/ThemeContext';
import { nl2br } from '@lib/utils';
import { Talk } from '@lib/types/all';
import { captureHourAndMinutesFromDateString, formatDate } from '@lib/dates';

import { Column, Grid } from '@components/_ui/Grid';
import LinkButton from '@components/_ui/LinkButton';

import styles from './TalkPage.module.scss';

type Props = {
    talk: Talk;
};

const today = new Date();

export default function TalkPage({ talk }: Props) {
    const talkEndDate = new Date(talk.end);
    talkEndDate.setMinutes(talkEndDate.getMinutes() - 10);
    const activityAlreadyTookPlace = today > talkEndDate;

    return (
        <section>
            <Grid align="center">
                <Column lg={1} sm={0} xsm={0} />
                <Column lg={10} sm={12}>
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
                                <span className={styles.image}>
                                    <Image src={speaker.image.url} alt={speaker.name} fill />
                                </span>
                            ))}
                            {talk.host && (
                                <span className={styles.image}>
                                    <Image src={talk.host.image.url} alt={talk.host.name} fill />
                                </span>
                            )}
                        </div>
                    )}
                </Column>
            </Grid>
            <Grid>
                <Column lg={2} sm={0} xsm={0} />
                <Column lg={8}>
                    {activityAlreadyTookPlace ? (
                        <div className={styles['took-place']}>
                            Este conteúdo já aconteceu.
                            <br />
                            <a
                                target="_blank"
                                href={`https://openfeedback.io/codecon-summit-24/${formatDate(
                                    talk.start,
                                    'yyyy-MM-dd'
                                )}/${talk.id}?forceColorScheme=dark`}
                            >
                                Clique aqui para avaliá-lo.
                            </a>
                        </div>
                    ) : (
                        <p
                            className={styles.description}
                            dangerouslySetInnerHTML={{ __html: nl2br(talk.description) }}
                        />
                    )}
                </Column>
            </Grid>

            <div className={styles.buttons}>
                <LinkButton type="secondary" href={`/programacao`}>
                    &laquo; Programação completa
                </LinkButton>
            </div>
        </section>
    );
}
