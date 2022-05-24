import React, { useState, useRef } from 'react';
import { Puzzle } from '@lib/types';
import styles from './puzzles.module.css';
import stylesForm from './default-game-form.module.css';
import LoadingDots from './loading-dots';
import PuzzlesRightAnswer from './puzzles-right-answer';

type Props = {
  userId: number | undefined;
  puzzle: Puzzle;
};

export default function PuzzlesForm({ userId, puzzle }: Props) {
  const formReference: any = useRef();
  const [answer, setAnswer] = useState('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [result, setResult] = useState<'right' | 'wrong' | 'almost' | undefined>(undefined);
  const [resultMessage, setResultMessage] = useState<string>('');

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setIsLoading(true);
    setResult(undefined);

    if (!answer) {
      return;
    }

    void fetch(formReference.current.action, {
      method: formReference.current.method,
      headers: new Headers({ 'Content-Type': 'application/json' }),
      body: JSON.stringify({ answer: answer, id: puzzle.id, userId })
    })
      .then(response => response.json())
      .then(response => {
        setResult(response.result);
        setResultMessage(response.message);
        setIsLoading(false);
      });
  }

  if (result === 'right') {
    return <PuzzlesRightAnswer msg={resultMessage} />;
  }

  return (
    <form
      action="/api/game/puzzles"
      method="POST"
      onSubmit={handleSubmit}
      ref={formReference}
      className={stylesForm.form}
    >
      {puzzle && (
        <>
          <input
            type="text"
            onChange={(e: any) => setAnswer(e.target.value)}
            value={answer}
            className={stylesForm.input}
            autoFocus
          />
          <button type="submit" disabled={isLoading || answer === ''} className={stylesForm.button}>
            {isLoading ? <LoadingDots size={8} /> : 'Responder'}
          </button>
          {result === 'almost' && <p className={styles.almost}>Quase! Tá no caminho certo.</p>}
          {result === 'wrong' && <p className={styles.wrong}>Resposta errada.</p>}
        </>
      )}
    </form>
  );
}
