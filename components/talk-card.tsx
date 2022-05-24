/**
 * Copyright 2020 Vercel Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import cn from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { parseISO, isBefore, isAfter } from 'date-fns';
import { Talk } from '@lib/types';
import styles from './talk-card.module.css';
import Reactions from './reactions';
import { captureHourAndMinutesFromDateString } from '@lib/dates'

type Props = {
  talk: Talk;
};

export default function TalkCard({ talk }: Props) {
  const [isTalkLive, setIsTalkLive] = useState(false);
  const { title, speaker, start, end } = talk;

  useEffect(() => {
    const now = Date.now();
    setIsTalkLive(isAfter(now, parseISO(start)) && isBefore(now, parseISO(end)));
  }, []);

  if (talk.emBreve) {
	  return (
		  <div className={cn(styles.card, styles.emBreve)}>
			  <h3>Em breve</h3>
		  </div>
	  )
  }

  return (
	<Link href={`/programacao/${talk.slug}`}>
		<a
			className={cn(styles.card, {
				[styles['type-panel']]: talk.talkType === 'Painel',
				[styles['type-talk']]: talk.talkType === 'Palestra',
				[styles['type-fish']]: talk.talkType === 'Fish Bowl'
			})}
		>
			<div className={styles.data}>
				<h4 className={styles.talkType}>
					<span>{talk.talkType == 'Painel' ? 'Talk' : talk.talkType}</span>
				</h4>
				<h4 className={styles.talkPlace}>
					<span>Sala {talk.place}</span>
				</h4>
			</div>
			<h2 className={styles.title}>{talk.title}</h2>
			<div className={styles.speakers}>
				{talk.speaker.map(t => (
					<>
						<img src={t.imageSquare.url} alt={t.name} />
					</>
				))}
				<div className={styles.hour}>
					{captureHourAndMinutesFromDateString(talk.start)} ~ {captureHourAndMinutesFromDateString(talk.end)}
				</div>
			</div>
		</a>
	</Link>
  )
}
