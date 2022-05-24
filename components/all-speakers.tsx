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

import { Speaker as SpeakerType } from '@lib/types';
import styles from './all-speakers.module.css';
import { parseISO, format } from 'date-fns';
import pt from 'date-fns/locale/pt'
import Reactions from './reactions';
import Button from './button';
import Speaker from './speaker';

type Props = {
  speakers: SpeakerType[];
};

const formatDate = (date: string, formatType: string) => {
  return format(parseISO(date), formatType, { locale: pt });
};

const createMarkup = (text: string) => {
  return {__html: text.replace(/(?:\r\n|\r|\n)/g, '<br>')};
}

export default function SpeakerSection({ speakers }: Props) {
  return (
    <>
    <div className={styles.container}>
      {speakers.map((s, index) => (
        <div className={styles.speakerContainer}>
          <Speaker speaker={s} showSocial isPurple={!(index % 3)} />
        </div>
      ))}
    </div>
    </>
  );
}
