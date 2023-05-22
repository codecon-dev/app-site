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
    1: 'Sala terraço',
    2: 'Sala arquipélago',
    3: 'Sala faial',
    4: 'Sala funchal',
    5: 'Sala madeira',
    6: 'Mezanino terraço'
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
                hour: '08:00',
                description: 'Welcome coffee'
            },
            {
                hour: '09:00',
                talks: talksOrdered.filter(talk =>
                    isActivityStartingTimeBetween(talk, '09:00', '10:00')
                )
            },
            {
                hour: '10:00',
                talks: talksOrdered.filter(talk =>
                    isActivityStartingTimeBetween(talk, '10:00', '11:00')
                )
            },
            {
                hour: '11:00',
                talks: talksOrdered.filter(talk =>
                    isActivityStartingTimeBetween(talk, '11:00', '12:30')
                )
            },
            {
                hour: '12:30',
                description: 'Horário de almoço'
            },
            {
                hour: '14:00',
                talks: talksOrdered.filter(talk =>
                    isActivityStartingTimeBetween(talk, '14:00', '15:00')
                )
            },
            {
                hour: '15:00',
                talks: talksOrdered.filter(talk =>
                    isActivityStartingTimeBetween(talk, '15:00', '16:00')
                )
            },
            {
                hour: '16:00',
                description: 'Coffee break'
            },
            {
                hour: '16:30',
                talks: talksOrdered.filter(talk =>
                    isActivityStartingTimeBetween(talk, '16:30', '18:00')
                )
            },
            {
                hour: '18:00',
                talks: talksOrdered.filter(talk =>
                    isActivityStartingTimeBetween(talk, '18:00', '19:00')
                )
            },
            {
                hour: '19:00',
                description: '🍺 Happy hour 🍺'
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
