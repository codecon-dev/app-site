import cn from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { parseISO, isBefore, isAfter } from 'date-fns';
import { Talk } from '@lib/types';
import styles from './talk-card-full.module.css';
import Reactions from './reactions';
import { captureHourAndMinutesFromDateString } from '@lib/dates'

type Props = {
  talk: Talk;
};

export default function TalkCardFull({ talk }: Props) {
  const [isTalkLive, setIsTalkLive] = useState(false);
  const { title, speaker, start, end } = talk;

  useEffect(() => {
    const now = Date.now();
    setIsTalkLive(isAfter(now, parseISO(start)) && isBefore(now, parseISO(end)));
  }, []);

  return (
	<div className={cn(styles.container, {
		[styles['type-panel']]: talk.talkType === 'Painel',
		[styles['type-talk']]: talk.talkType === 'Palestra',
		[styles['type-fish']]: talk.talkType === 'Fish Bowl',
		[styles['live']]: isTalkLive
	})}>
		<div className={styles.hour}>
			{isTalkLive && <><p className={styles.aoVivo}>Rolando agora!</p><br /><br /></>}
			{captureHourAndMinutesFromDateString(talk.start)} ~ {captureHourAndMinutesFromDateString(talk.end)}
		</div>
		<div className={styles.photo}>
			{talk.speaker.map(s => (
				<a className={styles.speaker}>
					<img src={s.imageSquare.url} alt={s.name} />
					<h4>{s.name}</h4>
				</a>
			))}
		</div>
		<div className={styles.data}>
			<h4 className={styles.talkType}>
				<span>{talk.talkType == 'Painel' ? 'Talk' : talk.talkType}</span>
			</h4>
			
			<h2 className={styles.title}>{talk.title}</h2>
			
			<p className={styles.description}>{talk.description}</p>
		</div>
	</div>
  )
}
