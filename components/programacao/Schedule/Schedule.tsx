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

type Props = {
    talks: Talk[];
};

type PriorityMap = Record<number, string>;

const placePriority: PriorityMap = {
    1: 'Sala 1',
    2: 'Sala 2',
    3: 'Sala 3'
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

function BgTalkCard({ moreLines }: { moreLines?: boolean }) {
    return (
        <div className={styles.bgTalkContainer}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            {!!moreLines && (
                <>
                    <span></span>
                    <span></span>
                </>
            )}
        </div>
    );
}

function TalkCard({ talk, index }: { talk: Talk; index: number }) {
    return (
        <div
            className={cn(styles.talkContainer, {
                [styles.talkContainerMiddle]: index === 1
            })}
        >
            <Activity sponsor={talk.sponsor ? talk.sponsor : undefined} soon={talk.emBreve}>
                <Activity.Header>
                    <p>{talk.talkType}</p>
                    <time>
                        {talk.place} • {captureHourAndMinutesFromDateString(talk.start)} ~{' '}
                        {captureHourAndMinutesFromDateString(talk.end)}
                    </time>
                </Activity.Header>
                <Activity.Title href={`/2022/programacao/${talk.slug}`}>
                    {talk.title}
                </Activity.Title>
                <Activity.Footer>
                    {!!talk.speaker?.length &&
                        talk.speaker.map(t => (
                            <Activity.SpeakerImage
                                key={t.slug}
                                href={`/2022/quem-vai/${t.slug}`}
                                src={t.image.url}
                                alt={t.name}
                            />
                        ))}

                    {talk.host && (
                        <Activity.SpeakerImage
                            key={talk.host.slug}
                            href={`/2022/quem-vai/${talk.host.slug}`}
                            src={talk.host.image.url}
                            alt={`[Host] ${talk.host.name}`}
                        />
                    )}
                </Activity.Footer>
            </Activity>
            <BgTalkCard />
        </div>
    );
}

export default function Schedule({ talks }: Props) {
    const [activeTab, setActiveTab] = useState(EVENT_DAYS.THURSDAY);
    const [firstBlock, setFirstBlock] = useState<Talk[]>();
    const [secondBlock, setSecondBlock] = useState<Talk[]>();
    const [thirdBlock, setThirdBlock] = useState<Talk[]>();
    const [fourthBlock, setFourthBlock] = useState<Talk[]>();
    const [hasHappyHour, setHasHappyHour] = useState(false);
    const sectionRef = useRef<null | HTMLDivElement>(null);

    useEffect(() => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const dayTwoDate = new Date('2022-09-23 00:00:00');
        const dayThreeDate = new Date('2022-09-24 00:00:00');
        let actualDayTab = EVENT_DAYS.THURSDAY;
        const hash = window.location.hash;

        if (today.toDateString() === dayTwoDate.toDateString() || hash === '#2') {
            actualDayTab = EVENT_DAYS.FRIDAY;
        } else if (today.toDateString() === dayThreeDate.toDateString() || hash === '#3') {
            actualDayTab = EVENT_DAYS.SATURDAY;
        }

        setActiveTab(actualDayTab);
    }, []);

    useEffect(() => {
        setHasHappyHour(activeTab === EVENT_DAYS.SATURDAY);
    }, [activeTab]);

    useEffect(() => {
        const talksByDay = [
            talks.filter(talk => isActivityStartingOnDay(talk, '22/09/2022')),
            talks.filter(talk => isActivityStartingOnDay(talk, '23/09/2022')),
            talks.filter(talk => isActivityStartingOnDay(talk, '24/09/2022'))
        ];

        const talksOrdered = sortTalksByHourAndPlace(talksByDay[activeTab], placePriority);

        setFirstBlock(
            talksOrdered.filter(talk => isActivityStartingTimeBetween(talk, '10:00', '11:00'))
        );
        setSecondBlock(
            talksOrdered.filter(talk => isActivityStartingTimeBetween(talk, '14:00', '15:00'))
        );
        setThirdBlock(
            talksOrdered.filter(talk => isActivityStartingTimeBetween(talk, '15:30', '16:30'))
        );
        setFourthBlock(
            talksOrdered.filter(talk => isActivityStartingTimeBetween(talk, '17:00', '18:00'))
        );
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
                <div className={cn(styles['libras'], styles['libras-mobile'])}>
                    <span className={styles['libras-image']}>
                        <Image
                            src="/icons/2022/libras.png"
                            layout="responsive"
                            width={64}
                            height={64}
                            alt="Emoji de pessoa fazendo sinal em Libras"
                            quality={100}
                        />
                    </span>
                    <p>
                        <strong>Evento acessível!</strong> As palestras em português terão
                        intérpretes de Libras.
                    </p>
                </div>
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
                        <span className={styles['full-text']}>Quinta (22/09)</span>
                        <span className={styles['mobile-text']}>22/09</span>
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
                        <span className={styles['full-text']}>Sexta (23/09)</span>
                        <span className={styles['mobile-text']}>23/09</span>
                    </button>
                    <button
                        className={cn({
                            [styles.active]: activeTab === EVENT_DAYS.SATURDAY
                        })}
                        onClick={() => {
                            setActiveTab(EVENT_DAYS.SATURDAY);
                            window.location.hash = '3';
                            scrollToTop();
                        }}
                    >
                        <span className={styles['full-text']}>Sábado (24/09)</span>
                        <span className={styles['mobile-text']}>24/09</span>
                    </button>
                    <div className={cn(styles['libras'], styles['libras-desktop'])}>
                        <span className={styles['libras-image']}>
                            <Image
                                src="/icons/2022/libras.png"
                                layout="responsive"
                                width={64}
                                height={64}
                                alt="Emoji de pessoa fazendo sinal em Libras"
                                quality={100}
                            />
                        </span>
                        <p>
                            <strong>Evento acessível!</strong> As palestras em português terão
                            intérpretes de Libras.
                        </p>
                    </div>
                </div>
            </nav>
            <div className="container">
                <div className={styles.grid}>
                    <span />
                    <span className={styles.place}>
                        <span>Sala 1</span>
                        <span className={styles.space} />
                    </span>
                    <span className={styles.place}>
                        <span>Sala 2</span>
                        <span className={styles.space} />
                    </span>
                    <span className={styles.place}>
                        <span>Sala 3</span>
                        <span className={styles.space} />
                    </span>

                    <div className={styles.hour}>
                        <span className={styles.bigHour}>
                            <span>10h</span>
                        </span>
                        <span className={styles.mediumHour}>
                            <span>10h30</span>
                        </span>
                        <span className={styles.bigHour}>
                            <span>11h</span>
                        </span>
                        <span className={styles.mediumHour}>
                            <span>11h30</span>
                        </span>
                    </div>

                    {firstBlock?.map((talk, index) => (
                        <TalkCard talk={talk} index={index} key={talk.id} />
                    ))}

                    <div className={styles.hour}>
                        <span className={styles.hiddenHour} />
                        <span className={styles.bigHour}>
                            <span>12h</span>
                        </span>
                        <span className={styles.mediumHour}>
                            <span>12h30</span>
                        </span>
                        <span className={styles.bigHour}>
                            <span>13h</span>
                        </span>
                        <span className={styles.mediumHour}>
                            <span>13h30</span>
                        </span>
                        <span className={styles.bigHour}>
                            <span>14h</span>
                        </span>
                    </div>

                    <div className={cn(styles.talkContainer, styles.talkContainerLunch)}>
                        <div className={styles.intervalCard}>
                            <div className={styles.header}>
                                <span className={styles.type}>Intervalo</span>
                                <span className={styles.time}>11h30 ~ 14h00</span>
                            </div>
                            <h3>
                                Momento livre para você almoçar, visitar estandes, participar de
                                nossas atividades extras e fazer networking.
                            </h3>
                        </div>
                        <BgTalkCard moreLines />
                    </div>

                    <div className={styles.hour}>
                        <span className={styles.hiddenHour} />
                        <span className={styles.mediumHour}>
                            <span>14h30</span>
                        </span>
                        <span className={styles.bigHour}>
                            <span>15h</span>
                        </span>
                        <span className={styles.mediumHour}>
                            <span>15h30</span>
                        </span>
                    </div>

                    {secondBlock?.map((talk, index) => (
                        <TalkCard talk={talk} index={index} key={talk.id} />
                    ))}

                    <div className={styles.hour}>
                        <span className={styles.hiddenHour} />
                        <span className={styles.bigHour}>
                            <span>16h</span>
                        </span>
                        <span className={styles.mediumHour}>
                            <span>16h30</span>
                        </span>
                        <span className={styles.bigHour}>
                            <span>17h</span>
                        </span>
                    </div>

                    {thirdBlock?.map((talk, index) => (
                        <TalkCard talk={talk} index={index} key={talk.id} />
                    ))}

                    <div className={styles.hour}>
                        <span className={styles.hiddenHour} />
                        <span className={styles.mediumHour}>
                            <span>17h30</span>
                        </span>
                        <span className={styles.bigHour}>
                            <span>18h</span>
                        </span>
                        <span className={styles.mediumHour}>
                            <span>18h30</span>
                        </span>
                    </div>

                    {fourthBlock?.map((talk, index) => (
                        <TalkCard talk={talk} index={index} key={talk.id} />
                    ))}

                    {hasHappyHour && (
                        <>
                            <div className={styles.hour}>
                                <span className={styles.hiddenHour} />
                                <span className={styles.bigHour}>
                                    <span>19h</span>
                                </span>
                                <span className={styles.mediumHour}>
                                    <span>19h30</span>
                                </span>
                                <span className={styles.bigHour}>
                                    <span>20h</span>
                                </span>
                            </div>

                            <div
                                className={cn(styles.talkContainer, styles.talkContainerHappyHour)}
                            >
                                <div className={cn(styles.intervalCard, styles.happyCard)}>
                                    <div className={styles.header}>
                                        <span className={styles.type}>Happy hour</span>
                                        <span className={styles.time}>18h30 ~ 20h00</span>
                                    </div>
                                    <h3>Happy hour virtual, com músicas e muito networking.</h3>
                                </div>
                                <BgTalkCard />
                            </div>
                        </>
                    )}
                </div>
            </div>
        </section>
    );
}
