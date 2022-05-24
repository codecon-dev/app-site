import EmojiRiddle, { Props as EmojiRiddleProps } from './emoji-riddle';
import React, { useEffect, useRef, useState } from 'react';
import LoadingDots from '@components/loading-dots';

import styles from './../default-game-form.module.css';
import { Response } from 'pages/api/game/emoji';
import classNames from 'classnames';

export default function EmojiRiddleForm({ userId }: { userId: number | undefined }) {
  const formReference: any = useRef();
  const [answer, setAnswer] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [result, setResult] = useState<string>('');
  const [error, setError] = useState<boolean>(false);
  const [riddle, setRiddle] = useState<EmojiRiddleProps | undefined>();

  function getNextRiddle(afterSuccess = false) {
    setIsLoading(true);
    setRiddle(undefined);
    setAnswer('');

    if (afterSuccess) {
      setTimeout(() => setResult(''), 5000);
    } else {
      setResult('');
    }

    void fetch(`/api/game/emoji?userId=${userId}`, { method: 'GET' })
      .then(response => response.json())
      .then((response: Response) => {
        setRiddle(response.riddle);
        setIsLoading(false);
      });
  }

  useEffect(() => getNextRiddle(), []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError(false);
    setResult('');

    if (!answer) {
      setResult('Por favor, insira uma resposta');
      setError(true);
      return;
    }

    setIsLoading(true);

    const response = await fetch(formReference.current.action, {
      method: formReference.current.method,
      headers: new Headers({ 'Content-Type': 'application/json' }),
      body: JSON.stringify({ answer: answer, id: riddle?.id, userId })
    });

    const responseJson: Response = await response.json();

    setError(!responseJson.success);
    setResult(responseJson.message);
    setIsLoading(false);

    if (responseJson.success) {
      getNextRiddle(true);
    }
  }

  return (
    <form
      action="/api/game/emoji"
      method="POST"
      onSubmit={handleSubmit}
      ref={formReference}
      className={styles.form}
    >
      {isLoading && !riddle && <LoadingDots size={14} />}
      {!isLoading && !riddle && (
        <h2>
          Você já respondeu todos as charadas. <br />
          Parabéns 👏👏👏
        </h2>
      )}

      {riddle && (
        <>
          <EmojiRiddle question={riddle.question} hint={riddle.hint} />

          <input
            type="text"
            onChange={(e: any) => setAnswer(e.target.value)}
            value={answer}
            className={styles.input}
            placeholder="Digite sua resposta"
            autoFocus
          />

          <p className={error ? styles.error : ''}>{result}</p>

          <button type="submit" disabled={isLoading} className={styles.button}>
            {isLoading ? <LoadingDots size={8} /> : 'Hit or Miss'}
          </button>

          <button
            type="button"
            className={classNames(styles.button, styles['button--secondary'])}
            onClick={() => getNextRiddle()}
          >
            Pular
          </button>
        </>
      )}
    </form>
  );
}
