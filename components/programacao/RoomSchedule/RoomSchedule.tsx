import { useEffect, useState } from 'react';
import { getCookie } from 'cookies-next';
import { Talk } from '@lib/types/all';
import {
    isTimeBetweenAcitivity,
    captureHourAndMinutesFromDateString,
    isActivityStartingOnDay,
    formatDate
} from '@lib/dates';
import Activity from '@components/_ui/Activity';
import LinkButton from '@components/_ui/LinkButton';

import Likes from '../Likes';

import styles from './RoomSchedule.module.scss';

type Props = {
    talks: Talk[];
    onlyLiked?: boolean;
};

const today = new Date();
const attendeeUuid = getCookie('attendeeUuid');

function AlreadyTookPlaceTalk({ talk }: { talk: Talk }) {
    return (
        <div className={styles.talk}>
            <h4>
                {captureHourAndMinutesFromDateString(talk.start)} - {talk.title}
            </h4>
            <a
                href={`https://openfeedback.io/codecon-summit-24/${formatDate(
                    talk.start,
                    'yyyy-MM-dd'
                )}/${talk.id}?forceColorScheme=dark`}
                target="_blank"
            >
                Deixe uma avaliação!
            </a>
        </div>
    );
}

function TalkComponent({
    talk,
    showHourDivider,
    onlyLiked
}: {
    talk: Talk;
    showHourDivider: boolean;
    onlyLiked?: boolean;
}) {
    const [likes, setLikes] = useState(0);
    const [userLiked, setUserLiked] = useState(false);
    const isTalkLive = isTimeBetweenAcitivity(talk, today);

    useEffect(() => {
        const getLikes = async () => {
            const response = await fetch(
                `/api/likes?talkId=${talk.id}&attendeeUuid=${attendeeUuid}`
            );
            const { data } = await response.json();
            setLikes(data.likes as number);
            setUserLiked(data.userLiked as boolean);
        };

        void getLikes();
    }, [talk]);

    const talkEndDate = new Date(talk.end);
    talkEndDate.setMinutes(talkEndDate.getMinutes() - 10);
    const activityAlreadyTookPlace = today > talkEndDate;

    talkEndDate.setMinutes(talkEndDate.getMinutes() + 60);
    const activityAlreadyTookPlaceLongTime = today > talkEndDate;

    if (activityAlreadyTookPlaceLongTime) {
        return null;
    }

    if (onlyLiked && !userLiked && talk.title !== 'Almoço') {
        return null;
    }

    if (activityAlreadyTookPlace) {
        return <AlreadyTookPlaceTalk talk={talk} />;
    }

    return (
        <span key={talk.id}>
            <div className={styles.talkContainer}>
                {showHourDivider && (
                    <header className={styles.hour}>
                        {captureHourAndMinutesFromDateString(talk.start)}
                        {isTalkLive && <span className={styles.live}>Agora</span>}
                    </header>
                )}
                <Activity
                    sponsor={talk.sponsor ? talk.sponsor : undefined}
                    soon={talk.emBreve}
                    lunch={talk.title === 'Almoço'}
                >
                    <Activity.Title href={`/programacao/${talk.id}`}>{talk.title}</Activity.Title>
                    <Activity.Footer>
                        {!!talk.speaker?.length &&
                            talk.speaker.map(t => (
                                <Activity.SpeakerImage
                                    key={t.slug}
                                    src={t.image.url}
                                    alt={t.name}
                                />
                            ))}

                        {talk.host && (
                            <Activity.SpeakerImage
                                key={talk.host.slug}
                                src={talk.host.image.url}
                                alt={`[Host] ${talk.host.name}`}
                            />
                        )}
                    </Activity.Footer>
                    <Activity.Header>
                        <time>
                            {talk.place} • {captureHourAndMinutesFromDateString(talk.start)} ~{' '}
                            {captureHourAndMinutesFromDateString(talk.end)}
                        </time>
                        <Likes
                            talkId={talk.id as string}
                            attendeeUuid={attendeeUuid as string}
                            likes={likes}
                            userLiked={userLiked}
                            setLikes={setLikes}
                            setUserLiked={setUserLiked}
                            absolute
                        />
                    </Activity.Header>
                </Activity>
            </div>
        </span>
    );
}

export default function RoomSchedule({ talks, onlyLiked }: Props) {
    const [userAlreadyLiked, setUserAlreadyLiked] = useState(false);
    const dayOne = talks.filter(talk => isActivityStartingOnDay(talk, '06/09/2024'));
    const dayTwo = talks.filter(talk => isActivityStartingOnDay(talk, '07/09/2024'));

    useEffect(() => {
        if (!onlyLiked) return;

        const getLikes = async () => {
            await fetch(`/api/likes?attendeeUuid=${attendeeUuid}`).then(response => {
                if (response.status === 200) {
                    setUserAlreadyLiked(true);
                }
            });
        };

        void getLikes();
    }, [onlyLiked]);

    if (!userAlreadyLiked && onlyLiked) {
        return (
            <section className={styles.centered}>
                <div className={styles['not-found']}>
                    <h3>Você ainda não salvou nenhum conteúdo</h3>
                    Toque no coração para salvar na sua agenda.
                    <br />
                    <br />
                    <LinkButton type="secondary" href={`/programacao`}>
                        &laquo; Programação
                    </LinkButton>
                </div>
            </section>
        );
    }

    return (
        <section>
            <div className="container">
                <h2 className={styles['day-title']}>Sexta (06/09)</h2>
                {dayOne.map((talk, index, array) => {
                    const showHourDivider =
                        (index > 0 && array[index - 1].start !== talk.start) || index === 0;

                    return (
                        <TalkComponent
                            key={talk.id}
                            onlyLiked={onlyLiked}
                            talk={talk}
                            showHourDivider={showHourDivider}
                        />
                    );
                })}

                <h2 className={styles['day-title']}>Sábado (07/09)</h2>
                {dayTwo.map((talk, index, array) => {
                    const showHourDivider =
                        (index > 0 && array[index - 1].start !== talk.start) || index === 0;

                    return (
                        <TalkComponent
                            key={talk.id}
                            onlyLiked={onlyLiked}
                            talk={talk}
                            showHourDivider={showHourDivider}
                        />
                    );
                })}
            </div>
        </section>
    );
}
