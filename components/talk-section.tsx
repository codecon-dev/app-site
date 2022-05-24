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

import Link from 'next/link';
import Image from 'next/image';
import cn from 'classnames';
import TwitterIcon from '@components/icons/icon-twitter';
import GithubIcon from '@components/icons/icon-github';
import { Talk } from '@lib/types';
import styles from './talk-section.module.css';
import { parseISO, format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Reactions from './reactions';
import Button from './button';
import { SALES_ENABLED, SYMPLA_URL } from '@lib/constants';
import { captureHourAndMinutesFromDateString } from '@lib/dates';

type Props = {
  talk: Talk;
};

const formatDate = (date: string, formatType: string) => {
  return format(parseISO(date), formatType, { locale: pt });
};

const createMarkup = (text: string) => {
  return { __html: text.replace(/(?:\r\n|\r|\n)/g, '<br>') };
};

export default function SpeakerSection({ talk }: Props) {
  return (
    <>
      <div className={styles.section}>
        <div className={styles.container}>
          <h4
            className={cn(styles.talkType, {
              [styles['type-panel']]: talk.talkType === 'Painel',
              [styles['type-talk']]: talk.talkType === 'Palestra'
            })}
          >
            <span>{talk.talkType}</span>
          </h4>

          <h1 className={styles.title}>{talk.title}</h1>

          <div className={styles.photo}>
            {talk.speaker.map(s => (
              <Link href={`/quem-vai/${s.slug}`}>
                <a className={styles.speaker}>
                  <img src={s.imageSquare.url} alt={s.name} />
                  <h4>{s.name}</h4>
                </a>
              </Link>
            ))}
          </div>
          <div className={styles.content}>
            <span className={styles.date}>
              {formatDate(talk.start, 'dd/MM')} - {captureHourAndMinutesFromDateString(talk.start)}{' '}
              ~ {captureHourAndMinutesFromDateString(talk.end)} <strong>|</strong> Sala {talk.place}
            </span>

            <Reactions id={talk.id} externalStyles={styles.reactions} />

            <p
              className={styles.description}
              dangerouslySetInnerHTML={createMarkup(talk.description)}
            />
          </div>
        </div>
      </div>
      <div className={styles.buttonsGrid}>
        {SALES_ENABLED && <Button isYellow blank title="Inscreva-se" url={SYMPLA_URL} />}
        <Button title="Programação completa" url="/programacao" />
      </div>
    </>
  );
}
