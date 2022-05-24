import { MarathonUser } from '@lib/types';
import { useState, FormEvent } from 'react';
import styles from './default-game-form.module.css';
import LoadingDots from './loading-dots';

type Props = {
  name: string | undefined;
  email?: string;
  userId?: number;
};

async function register({ gatherName, profileURI, userId }: MarathonUser) {
  const response = await fetch('/api/game/marathon', {
    method: 'POST',
    headers: new Headers({ 'Content-Type': 'application/json' }),
    body: JSON.stringify({
      gatherName: gatherName,
      profileURI: profileURI,
	  userId
    })
  });
  return response.json();
}

export default function MarathonRegister({ name, email, userId }: Props) {
  const [gatherName, setGatherName] = useState<string>('');
  const [profileURI, setProfileURI] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [result, setResult] = useState<string>('');
  const [error, setError] = useState<boolean>(false);

  async function handleOnClaimSubmit(event: FormEvent) {
    event.preventDefault();
    if (!gatherName || !profileURI) {
      setResult('Preencha todos os dados');
      return;
    }

    if (!name || !email) {
      setResult('Não foi possível obter o usuário');
      return;
    }

    setIsLoading(true);
    const result = await register({ gatherName, profileURI, userId });

    if (!result.success) {
      setError(true);
    } else {
      setError(false);
    }

    setResult(result.message || result.error.message);
    setIsLoading(false);
  }

  return (
    <form onSubmit={handleOnClaimSubmit} className={styles.form}>
      <p>
        Tá perdido? Leia as{' '}
        <a className="link" href="/game/maratona/como-funciona">
          regras de participação
        </a>
        .
      </p>
	  <p>Se o login não estiver funcionando, <a className="link" href="https://codecon.dev/game/maratona" target="_blank" rel="noopener noreferrer">clique aqui</a> para abrir em um nova aba e tente novamente.</p>
      <br />
      <input
        type="text"
        placeholder="Seu nome no Gather"
        onChange={event => setGatherName(event.target.value)}
        disabled={isLoading}
        className={styles.input}
        autoFocus
      ></input>
      <input
        type="text"
        placeholder="Link do perfil na URI"
        onChange={event => setProfileURI(event.target.value)}
        disabled={isLoading}
        className={styles.input}
      ></input>
      <button
        type="submit"
        disabled={isLoading || gatherName === '' || profileURI === ''}
        className={styles.button}
      >
        {isLoading ? <LoadingDots size={8} /> : 'Cadastrar'}
      </button>
      <p className={error ? styles.error : ''}>{result}</p>
    </form>
  );
}
