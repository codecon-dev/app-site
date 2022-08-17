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
    })
    
    const json = await response.json()
    const { data: { user }, success, message } = json
    if (!success) {
      toast.error(message);
      return;
    }
    
    const firstName = user.name.split(' ')[0];

    window.localStorage.setItem('codeconEmail', user.email);
    window.localStorage.setItem('codeconFullName', user.name);
    window.localStorage.setItem('codeconFirstName', firstName);

    setUserData({ firstName, fullName: user.name, email: user.email });
    toast.success(message);
  }

  if (isLoading) {
    return <div className={styles.loading} />;
  }

  if (userData) {
    return  <>{React.cloneElement(children, { data: userData })}</>
  }

  return (
      <>
        <p>Faça login para continuar</p>

        <form
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onSubmit={async e => {
            await handleSubmit(e);
          }}
        >
          <input
            onChange={event => setEmail(event.target.value)}
            type={'email'}
            placeholder={'Email'}
            />
          <input type="submit" />
        </form>
      </>
  );
}
