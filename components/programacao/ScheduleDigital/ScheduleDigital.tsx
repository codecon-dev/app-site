/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import Image from 'next/image';

import { EVENT_DAYS, Talk } from '@lib/types/all';
import {
    isActivityStartingTimeBetween,
    captureHourAndMinutesFromDateString,
    isActivityStartingOnDay
} from '@lib/dates';

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
    1: 'Sala 1',
    2: 'Sala 2'
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
    const [activeTab, setActiveTab] = useState(EVENT_DAYS.THURSDAY);
    const [blocks, setBlocks] = useState<Blocks[]>();
    const sectionRef = useRef<null | HTMLDivElement>(null);

    useEffect(() => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const dayTwoDate = new Date('2023-06-23 00:00:00');
        let actualDayTab = EVENT_DAYS.THURSDAY;
        const hash = window.location.hash;

        if (today.toDateString() === dayTwoDate.toDateString() || hash === '#2') {
            actualDayTab = EVENT_DAYS.FRIDAY;
        }

        setActiveTab(actualDayTab);
    }, []);

    useEffect(() => {
        const talksByDay = [
            talks.filter(talk => isActivityStartingOnDay(talk, '22/06/2023')),
            talks.filter(talk => isActivityStartingOnDay(talk, '23/06/2023'))
        ];

        const talksOrdered = sortTalksByHourAndPlace(talksByDay[activeTab], placePriority);

        setBlocks([
            {
                hour: '13:00',
                talks: talksOrdered.filter(talk =>
                    isActivityStartingTimeBetween(talk, '13:00', '14:00')
                )
            },
            {
                hour: '14:00',
                description: 'Aproveite esse tempo para explorar o mapa e as atividades'
            },
            {
                hour: '14:30',
                talks: talksOrdered.filter(talk =>
                    isActivityStartingTimeBetween(talk, '14:30', '15:30')
                )
            },
            {
                hour: '15:30',
                talks: talksOrdered.filter(talk =>
                    isActivityStartingTimeBetween(talk, '15:30', '16:30')
                )
            },
            {
                hour: '16:30',
                description: 'Aproveite esse tempo para explorar o mapa e as atividades'
            },
            {
                hour: '17:00',
                talks: talksOrdered.filter(talk =>
                    isActivityStartingTimeBetween(talk, '17:00', '18:00')
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
                talks: talksOrdered.filter(talk =>
                    isActivityStartingTimeBetween(talk, '19:00', '20:00')
                )
            }
        ]);
    }, [activeTab, talks]);

    function scrollToTop() {
        if (sectionRef.current) {
            sectionRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }

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

            <nav className={styles.tabs}>
                <div className={cn('container', styles['tabs-container'])}>
                    <button
                        className={cn({
                            [styles.active]: activeTab === EVENT_DAYS.THURSDAY
                        })}
                        onClick={() => {
                            setActiveTab(EVENT_DAYS.THURSDAY);
                            window.location.hash = '1';
                            scrollToTop();
                        }}
                    >
                        <span className={styles['full-text']}>Quinta (22/06)</span>
                        <span className={styles['mobile-text']}>22/06</span>
                    </button>
                    <button
                        className={cn({
                            [styles.active]: activeTab === EVENT_DAYS.FRIDAY
                        })}
                        onClick={() => {
                            setActiveTab(EVENT_DAYS.FRIDAY);
                            window.location.hash = '2';
                            scrollToTop();
                        }}
                    >
                        <span className={styles['full-text']}>Sexta (23/06)</span>
                        <span className={styles['mobile-text']}>23/06</span>
                    </button>
                    {hasLibras && (
                        <div className={cn(styles['libras'], styles['libras-desktop'])}>
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
            </nav>
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
