import { useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import Image from 'next/image';

import { Talk } from '@lib/types/all';
import { isActivityStartingTimeBetween, captureHourAndMinutesFromDateString } from '@lib/dates';

import styles from './Schedule.module.scss';
import Activity from '@components/_ui/Activity';

const hasLibras = false;

type Props = {
    talks: Talk[];
};

type PriorityMap = Record<number, string>;

type Blocks = {
    hour: string;
    description?: string;
    talks?: Talk[];
};

const placePriority: PriorityMap = {
    1: 'Teatro',
    2: 'Ginásio'
};

function getPriorityByPlace(place: string | undefined, priorityMap: PriorityMap) {
    const mapKeys = Object.keys(priorityMap);
    const priority = mapKeys.find((key: string) => priorityMap[Number(key)] === place);
    return Number(priority) || Infinity;
}

function sortTalksByHourAndPlace(talks: Talk[], priorityMap: PriorityMap): Talk[] {
    const talksWithPriority = talks.map(talk => ({
        ...talk,
        priority: getPriorityByPlace(talk.place, priorityMap)
    }));

    talksWithPriority.sort((currentTalk, nextTalk) => {
        return currentTalk.priority - nextTalk.priority;
    });

    return talksWithPriority;
}

function TalkCard({ talk }: { talk: Talk }) {
    return (
        <Activity
            sponsor={talk.sponsor ? talk.sponsor : undefined}
            featured={talk.featured}
            soon={talk.emBreve}
        >
            <Activity.Header>
                <p>
                    <strong>{talk.talkType}</strong> • {talk.place}
                </p>
                <time>
                    {captureHourAndMinutesFromDateString(talk.start)} ~{' '}
                    {captureHourAndMinutesFromDateString(talk.end)}
                </time>
            </Activity.Header>
            <Activity.Title href={`/programacao/${talk.slug}`}>{talk.title}</Activity.Title>
            <Activity.Footer>
                {!!talk.speaker?.length &&
                    talk.speaker.map(t => (
                        <Activity.SpeakerImage
                            key={t.slug}
                            href={`/quem-vai/${t.slug}`}
                            src={t.image.url}
                            alt={t.name}
                        />
                    ))}

                {talk.host && (
                    <Activity.SpeakerImage
                        key={talk.host.slug}
                        href={`/quem-vai/${talk.host.slug}`}
                        src={talk.host.image.url}
                        alt={`[Host] ${talk.host.name}`}
                    />
                )}
            </Activity.Footer>
        </Activity>
    );
}

export default function ScheduleDigital({ talks }: Props) {
    const [blocks, setBlocks] = useState<Blocks[]>();
    const sectionRef = useRef<null | HTMLDivElement>(null);

    useEffect(() => {
        const talksOrdered = sortTalksByHourAndPlace(talks, placePriority);

        setBlocks([
            {
                hour: '09:30',
                talks: talksOrdered.filter(talk =>
                    isActivityStartingTimeBetween(talk, '09:30', '10:30')
                )
            },
            {
                hour: '11:00',
                talks: talksOrdered.filter(talk =>
                    isActivityStartingTimeBetween(talk, '11:00', '12:00')
                )
            },
            {
                hour: '12:00',
                description: 'Horário de almoço'
            },
            {
                hour: '14:00',
                talks: talksOrdered.filter(talk =>
                    isActivityStartingTimeBetween(talk, '14:00', '15:00')
                )
            },
            {
                hour: '15:30',
                talks: talksOrdered.filter(talk =>
                    isActivityStartingTimeBetween(talk, '15:30', '16:30')
                )
            },
            {
                hour: '17:00',
                talks: talksOrdered.filter(talk =>
                    isActivityStartingTimeBetween(talk, '17:00', '18:00')
                )
            }
        ]);
    }, [talks]);

    return (
        <section ref={sectionRef}>
            <div className="container">
                {hasLibras && (
                    <div className={cn(styles['libras'], styles['libras-mobile'])}>
                        <span className={styles['libras-image']}>
                            <Image
                                src="/icons/libras.png"
                                width={32}
                                height={32}
                                alt="Emoji de pessoa fazendo sinal em Libras"
                                quality={100}
                            />
                        </span>
                        <p>
                            <strong>Evento acessível!</strong> As palestras em português terão
                            intérpretes de Libras.
                        </p>
                    </div>
                )}
            </div>

            <div className="container">
                {blocks?.map(({ hour, talks, description }) => (
                    <>
                        <div className={styles.division}>
                            <img src="/icons/clock.png" />
                            <span className={styles.hour}>{hour}</span>
                            {description && (
                                <span className={styles.description}>{description}</span>
                            )}
                            <span className={styles.line} />
                        </div>
                        {talks && (
                            <div className={styles.talks}>
                                {talks.map(talk => (
                                    <TalkCard talk={talk} key={talk.id} />
                                ))}
                            </div>
                        )}
                    </>
                ))}
            </div>
        </section>
    );
}
