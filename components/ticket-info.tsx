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

import styles from './ticket-info.module.css';
import { DATE, SITE_URL } from '@lib/constants';
import CodeconLogo from '@components/icons/icon-platform';

const siteUrl = new URL(SITE_URL);

export default function TicketInfo() {
  return (
    <div className={styles.info}>
      <div className={styles.logo}>
        <CodeconLogo width="100%" />
      </div>
      <div className={styles.date}>
        {DATE} <span>&amp;&amp;</span> online <br /><span>&amp;&amp;</span> gamificado <span>&amp;&amp;</span> codecon.dev
      </div>
    </div>
  );
}
