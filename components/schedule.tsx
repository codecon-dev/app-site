/* eslint-disable prefer-const */
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Link from 'next/link';
import cn from 'classnames';
import { Talk } from '@lib/types';
import styles from './schedule.module.css';
import TalkCard from './talk-card';
import { useEffect } from 'react';
import { isActivityStartingTimeBetween } from '@lib/dates'

type Props = {
  allTalks: Talk[];
};

type CodeconToastProps = {
  image: string;
  color: 'yellow' | 'purple' | 'white';
  text: string;
};

function getPriorityByPlace (place: string, priorityMap: PriorityMap) {
  const mapKeys = Object.keys(priorityMap);
  const priority = mapKeys.find((key: string) => priorityMap[Number(key)] === place)
  return Number(priority) || Infinity;
}

function sortTalksByHourAndPlace(talks: Talk[], priorityMap: PriorityMap): Talk[] {
  const talksWithPriority = talks.map(talk => ({
    ...talk,
    priority: getPriorityByPlace(talk.place, priorityMap)
  }));

  talksWithPriority.sort((currentTalk, nextTalk) => {
    return currentTalk.priority - nextTalk.priority
  });

  return talksWithPriority;
}

type PriorityMap = Record<number, string>

// 1 = Highest Priority (will appear first)
const placePriority: PriorityMap = {
  1: 'Lovelace',
  2: 'Turing',
  3: 'Hopper'
};

function BgTalkContainer() {
  return (
    <div className={styles.bgTalkContainer}>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
}

const CodeconToast = ({ image, color, text }: CodeconToastProps) => (
  <div className={styles.toast} style={{ backgroundImage: `url(${image})` }}>
    <div className={styles.toastImage} />
    <div className={cn(styles.toastBalloon, {
        [styles.toastYellow]: color === 'yellow',
        [styles.toastPurple]: color === 'purple'
      })}>
      <>{text}</>
    </div>
  </div>
)

export default function Schedule({ allTalks }: Props) {
  const talksOrdered = sortTalksByHourAndPlace(allTalks, placePriority)

  const nine = talksOrdered.filter(talk => isActivityStartingTimeBetween(talk, '9:00', '10:00'));
  const tenAndHalf = talksOrdered.filter(talk => isActivityStartingTimeBetween(talk, '10:30', '11:30'));
  const oneAndHalf = talksOrdered.filter(talk => isActivityStartingTimeBetween(talk, '13:30', '14:30'));
  const three = talksOrdered.filter(talk => isActivityStartingTimeBetween(talk, '15:00', '16:00'));
  const fourAndHalf = talksOrdered.filter(talk => isActivityStartingTimeBetween(talk, '16:30', '17:30'));

  useEffect(() => {
	let toastEnigmas;
	let toastMaratona;
	let toastCodes;
	
	toast.dismiss()
	toast.clearWaitingQueue();
	clearTimeout(toastEnigmas);
	clearTimeout(toastMaratona);
	clearTimeout(toastCodes);

	toastEnigmas = setTimeout(() => {
		toast.dark(
		  <CodeconToast
			image="/toast-enigmas.png"
			color="yellow"
			text="Participe de um jogo onde cada etapa é um enigma. Valendo prêmios, obviamente."
		  />, {
			toastId: 'toast-enigmas'
		  }
		)
	  }, 2000);

	toastMaratona = setTimeout(() => {
		toast.dark(
		  <CodeconToast
			image="/toast-maratona.png"
			color="purple"
			text="Mostre sua habilidade de programação. Quem for mais rápido e mais assertivo ganha."
		  />, {
			toastId: 'toast-maratona'
		  }
		)
	  }, 5000);

	toastCodes = setTimeout(() => {
		toast.dark(
		  <CodeconToast
			image="/toast-code-codes.png"
			color="white"
			text="Resgate códigos que valem pontos participando do evento. Os 10 primeiros do ranking levam prêmios."
		  />, {
			toastId: 'toast-codes'
		  }
		)
	  }, 8000);

  }, [])

  

  return (
    <>
    <div className={styles.container}>
      <div className={styles.grid}>
        <div></div>
        <div className={styles.place}>
          <span>Sala Lovelace</span>
        </div>
        <div className={styles.place}>
          <span>Sala Turing</span>
        </div>
        <div className={styles.place}>
          <span>Sala Hopper</span>
        </div>
        <div></div>

        <div className={styles.hour}>
          <div className={styles.bigHour}>
            <span>9h</span>
          </div>
          <div className={styles.mediumHour}>
            <span>9h30</span>
          </div>
          <div className={styles.bigHour}>
            <span>10h</span>
          </div>
          <div className={styles.mediumHour}>
            <span>10h30</span>
          </div>
        </div>

        {nine.map((talk, index) => (
          <div className={cn(styles.talkContainer, {
				    [styles.talkContainerMiddle]: index === 1,
			    })}>
            <TalkCard key={talk.slug} talk={talk} />
            <BgTalkContainer />
          </div>
        ))}
        <div className={styles.workshops}>
			<div className={styles.workshopsBg}>
				<Link href="/workshops">
					<a>Workshops rolando simultaneamente</a>
				</Link>
			</div>
		</div>

        <div className={styles.hour}>
          <div className={styles.hiddenHour}></div>
          <div className={styles.bigHour}>
            <span>11h</span>
          </div>
          <div className={styles.mediumHour}>
            <span>11h30</span>
          </div>
          <div className={styles.bigHour}>
            <span>12h</span>
          </div>
        </div>

		{tenAndHalf.map((talk, index) => (
		  <div className={cn(styles.talkContainer, {
				[styles.talkContainerMiddle]: index === 1,
			})}>
			<TalkCard key={talk.slug} talk={talk} />
			<BgTalkContainer />
		  </div>
		))}
		
		<div className={styles.hour}>
		  <div className={styles.hiddenHour}></div>
		  <div className={styles.mediumHour}>
			<span>12h30</span>
		  </div>
		  <div className={styles.bigHour}>
			<span>13h</span>
		  </div>
		  <div className={styles.mediumHour}>
			<span>13h30</span>
		  </div>
		</div>

		<div className={cn(styles.talkContainer, styles.talkContainerLunch)}>
			<div className={styles.intervalCard}>
				<div className={styles.intervalHour}>12h00 ~ 13h30</div>
				<h2>Intervalo</h2>
			</div>
			<BgTalkContainer />
		</div>

        <div></div>

        <div className={styles.hour}>
            <div className={styles.hiddenHour}></div>
            <div className={styles.bigHour}>
                <span>14h</span>
            </div>
            <div className={styles.mediumHour}>
                <span>14h30</span>
            </div>
            <div className={styles.bigHour}>
                <span>15h</span>
            </div>
        </div>

        {oneAndHalf.map((talk, index) => (
          <div className={cn(styles.talkContainer, {
                [styles.talkContainerMiddle]: index === 1,
            })}>
            <TalkCard key={talk.slug} talk={talk} />
            <BgTalkContainer />
          </div>
        ))}
        <div className={styles.workshopsAfternoon}>
            <div className={styles.workshopsBg}>
				<Link href="/workshops">
					<a>Workshops rolando simultaneamente</a>
				</Link>
            </div>
        </div>

        <div className={styles.hour}>
            <div className={styles.hiddenHour}></div>
            <div className={styles.mediumHour}>
                <span>15h30</span>
            </div>
            <div className={styles.bigHour}>
                <span>16h</span>
            </div>
            <div className={styles.mediumHour}>
                <span>16h30</span>
            </div>
        </div>

        {three.map((talk, index) => (
          <div className={cn(styles.talkContainer, {
                [styles.talkContainerMiddle]: index === 1,
            })}>
            <TalkCard key={talk.slug} talk={talk} />
            <BgTalkContainer />
          </div>
        ))}

        <div className={styles.hour}>
          <div className={styles.hiddenHour}></div>
          <div className={styles.bigHour}>
            <span>17h</span>
          </div>
          <div className={styles.mediumHour}>
            <span>17h30</span>
          </div>
          <div className={styles.bigHour}>
            <span>18h</span>
          </div>
        </div>

        {fourAndHalf.map((talk, index) => (
          <div className={cn(styles.talkContainer, {
                [styles.talkContainerMiddle]: index === 1,
            })}>
            <TalkCard key={talk.slug} talk={talk} />
            <BgTalkContainer />
          </div>
        ))}
        <div></div>

        <div className={styles.hour}>
            <div className={styles.hiddenHour}></div>
            <div className={styles.mediumHour}>
                <span>18h30</span>
            </div>
            <div className={styles.bigHour}>
                <span>19h</span>
            </div>
            <div className={styles.mediumHour}>
                <span>19h30</span>
            </div>
        </div>

        <div className={cn(styles.talkContainer, styles.talkContainerHappyHour)}>
            <div className={cn(styles.intervalCard, styles.happyCard)}>
                <div className={styles.intervalHour}>18h00 ~ 19h30</div>
                <h2>Happy hour virtual com DJs e coisarada</h2>
            </div>
            <BgTalkContainer />
        </div>

        <div></div>

      </div>
    </div>
    <ToastContainer
      position="bottom-right"
      autoClose={false}
      style={{ width: '400px' }}
      toastClassName={styles.toastContainer}
      bodyClassName={styles.toastBody}
    />
    </>
  );
}
