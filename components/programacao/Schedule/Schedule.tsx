import cn from 'classnames';

import { Talk } from '@lib/types/all';
import {
  isActivityStartingTimeBetween,
  captureHourAndMinutesFromDateString,
  isActivityStartingOnDay
} from '@lib/dates';

import styles from './Schedule.module.scss';
import Activity from '@components/_ui/Activity';
import { useEffect, useState } from 'react';

enum TABS {
  THUSDAY = 0,
  FRIDAY = 1,
  SATURDAY = 2
}

type Props = {
  talks: Talk[];
};

type PriorityMap = Record<number, string>;

const placePriority: PriorityMap = {
  1: 'Sala 1',
  2: 'Sala 2',
  3: 'Sala 3'
};

function getPriorityByPlace(place: string, priorityMap: PriorityMap) {
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

function BgTalkContainer({ moreLines }: { moreLines?: boolean }) {
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

function TalkContainer({ talk, index }: { talk: Talk; index: number }) {
  return (
    <div
      className={cn(styles.talkContainer, {
        [styles.talkContainerMiddle]: index === 1
      })}
    >
      <Activity sponsor={talk.sponsor ? talk.sponsor : undefined}>
        <Activity.Header>
          <p>{talk.talkType}</p>
          <time>
            {captureHourAndMinutesFromDateString(talk.start)} ~{' '}
            {captureHourAndMinutesFromDateString(talk.end)}
          </time>
        </Activity.Header>
        <Activity.Title href={`/programacao/${talk.slug}`}>{talk.title}</Activity.Title>
        <Activity.Footer>
          {talk.speaker.map(t => (
            <Activity.SpeakerImage href={`/quem-vai/${t.slug}`} src={t.image.url} alt={t.name} />
          ))}
        </Activity.Footer>
      </Activity>
      <BgTalkContainer />
    </div>
  );
}

export default function Schedule({ talks }: Props) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const dayTwoDate = new Date('2022-09-23 00:00:00');
  const dayThreeDate = new Date('2022-09-24 00:00:00');
  let actualDayTab = TABS.THUSDAY;

  if (today.toDateString() === dayTwoDate.toDateString()) {
    actualDayTab = TABS.FRIDAY;
  } else if (today.toDateString() === dayThreeDate.toDateString()) {
    actualDayTab = TABS.SATURDAY;
  }

  const [activeTab, setActiveTab] = useState(actualDayTab);
  const [firstBlock, setFirstBlock] = useState<Talk[]>();
  const [secondBlock, setSecondBlock] = useState<Talk[]>();
  const [thirdBlock, setThirdBlock] = useState<Talk[]>();
  const [fourthBlock, setFourthBlock] = useState<Talk[]>();
  const hasHappyHour = activeTab === TABS.SATURDAY;

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

  return (
    <section>
      <nav className={styles.tabs}>
        <div className="container">
          <button
            className={cn({
              [styles.active]: activeTab === TABS.THUSDAY
            })}
            onClick={() => {
              setActiveTab(TABS.THUSDAY);
            }}
          >
            <span className={styles['full-text']}>Quinta (22/09)</span>
            <span className={styles['mobile-text']}>22/09</span>
          </button>
          <button
            className={cn({
              [styles.active]: activeTab === TABS.FRIDAY
            })}
            onClick={() => {
              setActiveTab(TABS.FRIDAY);
            }}
          >
            <span className={styles['full-text']}>Sexta (23/09)</span>
            <span className={styles['mobile-text']}>23/09</span>
          </button>
          <button
            className={cn({
              [styles.active]: activeTab === TABS.SATURDAY
            })}
            onClick={() => {
              setActiveTab(TABS.SATURDAY);
            }}
          >
            <span className={styles['full-text']}>Sábado (24/09)</span>
            <span className={styles['mobile-text']}>24/09</span>
          </button>
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
            <TalkContainer talk={talk} index={index} key={talk.id} />
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
                Momento livre para você almoçar, visitar estandes, participar de nossas atividades
                extras e fazer networking.
              </h3>
            </div>
            <BgTalkContainer moreLines />
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
            <TalkContainer talk={talk} index={index} key={talk.id} />
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
            <TalkContainer talk={talk} index={index} key={talk.id} />
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
            <TalkContainer talk={talk} index={index} key={talk.id} />
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

              <div className={cn(styles.talkContainer, styles.talkContainerHappyHour)}>
                <div className={cn(styles.intervalCard, styles.happyCard)}>
                  <div className={styles.header}>
                    <span className={styles.type}>Happy hour</span>
                    <span className={styles.time}>18h30 ~ 20h00</span>
                  </div>
                  <h3>Happy hour virtual, com músicas e muito networking.</h3>
                </div>
                <BgTalkContainer />
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
