import React, { ReactElement, useState, SyntheticEvent, useCallback } from 'react';
import toast from 'react-hot-toast';

import User from 'src/database/model/User';
import { ConfUser } from '@lib/types/all';
import { useIsLoggedIn } from '@hooks/useIsLoggedIn';

import styles from './PrivateArea.module.scss';

type Props = {
  children: ReactElement;
};

type LoginResponse = { data: { user: User }; success: boolean; message: string };

export default function PrivateArea({ children }: Props) {
  const [email, setEmail] = useState('');
  const [userData, setUserData] = useState<ConfUser>();

  const isLoading = useIsLoggedIn(
    useCallback(data => {
      setUserData(data);
    }, [])
  );

  async function handleSubmit(e: SyntheticEvent): Promise<void> {
    e.preventDefault();

    const response = await fetch(`/api/login/check`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email })
    });

    const json = await response.json();
    const { data, success, message }: LoginResponse = json;
    if (!success) {
      toast.error(message);
      return;
    }

    const firstName = data.user.name.split(' ')[0];

    window.localStorage.setItem('codeconEmail', data.user.email);
    window.localStorage.setItem('codeconFullName', data.user.name);
    window.localStorage.setItem('codeconFirstName', firstName);

    setUserData({ firstName, fullName: data.user.name, email: data.user.email });
    toast.success(message);
  }

  if (isLoading) {
    return <div className={styles.loading} />;
  }

  if (userData) {
    return <>{React.cloneElement(children, { data: userData })}</>
  }

  return (
    <section>
      <div className="container">
        <h3>Faça login para continuar</h3>

        <form
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onSubmit={async e => {
            await handleSubmit(e);
          }}
        >
          <input
            onChange={event => setEmail(event.target.value)}
            type={'email'}
            placeholder={'Seu e-mail cadastrado'}
            required
            className={styles.input}
          />
          <input type="submit" value="Fazer login" className={styles.button} />
        </form>
      </div>
    </section>
  );
}
