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

import { useState } from 'react';
import cn from 'classnames';
import { useRouter } from 'next/router';
import LoadingDots from '../loading-dots';
import styleUtils from '../utils.module.css';
import styles from './cta.module.css';

type FormState = 'default' | 'loading' | 'error';

export default function Cta() {
  const [email, setEmail] = useState('');
  const [focused, setFocused] = useState(false);
  const [formState, setFormState] = useState<FormState>('default');
  const router = useRouter();

  return (
    <>
    <div className={styles.wrapper}>
      <div className={styles['form-row']}>

        <form className={styles['form-input']} action="https://www.getrevue.co/profile/codecon/add_subscriber" method="post" id="revue-form" name="revue-form"  target="_blank">
        <span className={styles.date}>
          Receba nossa newsletter
        </span>
          <label
            htmlFor="email-input-field"
            className={cn(styles['input-label'], {
              [styles.focused]: focused
            })}
          >
            <input
              className={styles.input}
              autoComplete="off"
              type="email"
              id="email-input-field"
              name="member[email]"
              placeholder="Seu e-mail"
              aria-label="Seu e-mail"
              required
            />
          </label>
          <button
            type="submit"
            className={cn(styles.submit, styles.register, styles[formState])}
            disabled={formState === 'loading'}
          >
            Inscreva-se
          </button>
          </form>
        </div>
      </div>
    </>
  );
}
