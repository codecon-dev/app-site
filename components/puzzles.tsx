import { useState, useEffect } from 'react';
import { ConfDataContext, UserData } from '@lib/hooks/use-conf-data';
import useLoginStatus from '@lib/hooks/use-login-status';
import Login from './login';
import Header from '@components/header';
import LoadingDots from './loading-dots';
import styles from './register.module.css';
import { Puzzle } from '@lib/types';
import PuzzlesForm from './puzzles-form';
import { getUserAlreadyAnswered } from '@lib/puzzles-api';
import PuzzlesRightAnswer from './puzzles-right-answer';
import { GAMES_ENABLED } from '@lib/constants';

type Props = {
  puzzle: Puzzle;
};

const defaultUserData = {
  id: undefined,
  ticketNumber: undefined,
  name: undefined,
  username: undefined
};

export default function Puzzles({ puzzle }: Props) {
  const [userData, setUserData] = useState<UserData>(defaultUserData);
  const [firstName, setFirstName] = useState<string>('');
  const [userAlreadyAnswered, setUserAlreadyAnswered] = useState<boolean | undefined>(undefined);
  const [userId, setUserId] = useState<number | undefined>(undefined);
  const { data, loginStatus, mutate } = useLoginStatus();

  function getAndSetUserIdFromLocalStorage() {
    const loginId = window.localStorage.getItem('symplaLogin') || '';
    if (!userId && loginId) {
      const ticketNumber = Number(loginId.split(':')[1]);
      setUserId(ticketNumber);
      return ticketNumber;
    }
    return userId;
  }

  async function checkUserAlreadyAnswered(userId?: number): Promise<boolean | undefined> {
    if (!puzzle) return undefined;
    const { success, userAnswered } = await getUserAlreadyAnswered(puzzle.id, userId);
    return success && userAnswered;
  }

  async function getUserIdAndCheckUserAlreadyAnswered() {
    const userId = getAndSetUserIdFromLocalStorage();
    const hasAlreadyAnswered = await checkUserAlreadyAnswered(userId);
    setUserAlreadyAnswered(hasAlreadyAnswered);
  }

  useEffect(() => {
    void getUserIdAndCheckUserAlreadyAnswered();
  }, [puzzle]);

  useEffect(() => {
    if (!data) return;

    setUserData(data.userData);

    const name = `${data.userData.name}`;
    const nameArray = name.split(' ');
    setFirstName(nameArray[0]);
  }, [loginStatus, data]);

  async function onLogin(data: UserData) {
    const userAlreadyAnsweredData = await getUserAlreadyAnswered(puzzle.id, data.ticketNumber);
    setUserAlreadyAnswered(userAlreadyAnsweredData?.userAnswered);
    setUserId(data.ticketNumber);
    await mutate();
  }

  if (loginStatus === 'loading' || userAlreadyAnswered === undefined) {
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
          <Header hero="Enigmas do Asaas" description="Faça login para continuar" />
          <Login onLogin={data => onLogin(data)} />
        </>
      ) : (
        <>
          <Header
            hero="Enigmas do Asaas"
            description={
              firstName
                ? `Qual a resposta para esta sala, ${firstName}?`
                : 'Qual a resposta para esta sala?'
            }
          />
          {userAlreadyAnswered ? (
            <PuzzlesRightAnswer msg="Cada enigma só pode ser respondido uma vez." />
          ) : GAMES_ENABLED ? (
            <PuzzlesForm userId={userId} puzzle={puzzle} />
          ) : (
            <p style={{ textAlign: 'center' }}>Jogos desabilitados.</p>
          )}
        </>
      )}
    </ConfDataContext.Provider>
  );
}
