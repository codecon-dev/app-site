import cn from 'classnames';

import { EVENT_DAYS, Talk } from '@lib/types/all';
import {
    isTimeBetweenAcitivity,
    captureHourAndMinutesFromDateString,
    isActivityStartingOnDay
} from '@lib/dates';
import Activity from '@components/2022/_ui/Activity';

import styles from './RoomSchedule.module.scss';
import { useEffect, useState } from 'react';
import Header from '@components/2022/_ui/Header';

type Props = {
    talks: Talk[];
    title: string;
};

const today = new Date();
const dayTwoDate = new Date('2022-09-23 00:00:00');
const dayThreeDate = new Date('2022-09-24 00:00:00');

function TalkCard({ talk, index }: { talk: Talk; index: number }) {
    const isTalkLive = isTimeBetweenAcitivity(talk, `${today.getHours()}:${today.getMinutes()}`);

    return (
        <div className={styles.talkContainer} key={index}>
            <header className={styles.hour}>
                {captureHourAndMinutesFromDateString(talk.start)}
                {isTalkLive && today.getDate() >= 22 && (
                    <span className={styles.live}>Ao vivo</span>
                )}
            </header>
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
        </div>
    );
}

export default function RoomSchedule({ talks, title }: Props) {
    const firstDay = talks.filter(talk => isActivityStartingOnDay(talk, '22/09/2022'));
    const [todayTalks, setTodayTalks] = useState(firstDay);
    const [dayTitle, setDayTitle] = useState('quinta (22/09)');

    useEffect(() => {
        if (today.getDate() === dayTwoDate.getDate()) {
            setDayTitle('sexta (23/09)');
            setTodayTalks(talks.filter(talk => isActivityStartingOnDay(talk, '23/09/2022')));
        } else if (today.getDate() === dayThreeDate.getDate()) {
            setDayTitle('sábado (24/09)');
            setTodayTalks(talks.filter(talk => isActivityStartingOnDay(talk, '24/09/2022')));
        }
    }, [talks]);

    return (
        <>
            <Header title={title} description={`Programação de ${dayTitle}`} />
            <div className="container">
                {todayTalks.map((talk, index) => (
                    <TalkCard talk={talk} index={index} />
                ))}
            </div>
        </>
    );
}
