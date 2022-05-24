import { useState, useEffect } from 'react';
import { ConfDataContext, UserData } from '@lib/hooks/use-conf-data';
import useLoginStatus from '@lib/hooks/use-login-status';
import Login from './login';
import Header from '@components/header';
import LoadingDots from './loading-dots';
import styles from './register.module.css';
import CodecodesClaimForm from './codecodes-claim-form';
import { GAMES_ENABLED } from '@lib/constants';

const defaultUserData = {
  id: undefined,
  ticketNumber: undefined,
  name: undefined,
  username: undefined
};

export default function Claim() {
  const [userData, setUserData] = useState<UserData>(defaultUserData);
  const [userId, setUserId] = useState<number | undefined>(undefined);
  const { data, loginStatus, mutate } = useLoginStatus();

  useEffect(() => {
    if (!data) return;

    setUserData(data.userData);
  }, [loginStatus]);

  async function onLogin(data: UserData) {
    setUserId(data.ticketNumber);
    await mutate();
  }

  if (!userId && loginStatus === 'loading') {
    return (
      <div className={styles.container}>
        <LoadingDots size={8} />
      </div>
    );
  }

  return (
    <ConfDataContext.Provider
      value={{
        userData,
        setUserData
      }}
    >
      {!userId && loginStatus === 'loggedOut' ? (
        <>
          <Header hero="Code-codes" description="Faça login para continuar" />
          <Login onLogin={data => onLogin(data)} />
        </>
      ) : (
        <>
          <Header hero="Code-codes" description="Qual código você deseja resgatar?" />
          {GAMES_ENABLED ? (
            <CodecodesClaimForm name={userData?.name} email={userData?.email} />
          ) : (
            <p style={{ textAlign: 'center' }}>Resgate desabilitado.</p>
          )}
        </>
      )}
    </ConfDataContext.Provider>
  );
}
