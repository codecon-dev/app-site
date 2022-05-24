import { CodecodesClaimPayload } from '@lib/types';
import { useState, FormEvent } from 'react';
import styles from './default-game-form.module.css';
import LoadingDots from './loading-dots';

type Props = {
  name: string | undefined;
  email?: string;
};

async function claim({ code, name, email }: CodecodesClaimPayload) {
  const response = await fetch('/api/codecodes/claim', {
    method: 'POST',
    body: JSON.stringify({
      code,
      name,
      email
    })
  });
  return response.json();
}

export default function CodecodesClaimForm({ name, email }: Props) {
  const [code, setCode] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [result, setResult] = useState<string>('');
  const [error, setError] = useState<boolean>(false);

  async function handleOnClaimSubmit(event: FormEvent) {
    event.preventDefault();
    if (!code) {
      setResult('Por favor insira um código');
      return;
    }

    if (!name || !email) {
      setResult('Não foi possível obter o usuário');
      return;
    }

    setIsLoading(true);
    const result = await claim({ code, name, email });

    if (result.status !== 'success' || result.error) {
      setError(true);
    } else {
      setError(false);
    }

    setResult(result.message || result.error.message);
    setIsLoading(false);
  }

  return (
    <form onSubmit={handleOnClaimSubmit} className={styles.form}>
      <input
        type="text"
        onChange={event => setCode(event.target.value)}
        disabled={isLoading}
        className={styles.input}
        autoFocus
      ></input>
      <button type="submit" disabled={isLoading || code === ''} className={styles.button}>
        {isLoading ? <LoadingDots size={8} /> : 'Resgatar'}
      </button>
      <p className={error ? styles.error : ''}>{result}</p>
    </form>
  );
}
