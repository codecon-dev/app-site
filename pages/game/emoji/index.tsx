import EmojiRiddleForm from '@components/game/emoji-riddle-form';
import { ConfDataContext, defaultUserData, UserData } from '@lib/hooks/use-conf-data';
import Header from '@components/header';
import Login from '@components/login';
import useLoginStatus from '@lib/hooks/use-login-status';
import { useEffect, useState } from 'react';
import Page from '@components/page';
import Layout from '@components/layout';
import { GAMES_ENABLED } from '@lib/constants';

export default function Emoji() {
  const [userData, setUserData] = useState<UserData>(defaultUserData);
  const [userId, setUserId] = useState<number | undefined>(undefined);
  const { loginStatus, mutate } = useLoginStatus();
  const meta = {
    title: 'Emojis Riddle - Codecon Digital',
    description: 'Descubra as respostas e ganhe pontos.'
  };

  useEffect(() => {
    const loginId = window.localStorage.getItem('symplaLogin') || '';
    if (loginId) {
      const ticketNumber = loginId.split(':')[1];
      setUserId(Number(ticketNumber));
    }
  }, []);

  async function onLogin(data: UserData) {
    setUserId(data.ticketNumber);
    await mutate();
  }

  return (
    <Page meta={meta}>
      <Layout hideNav hideFooter>
        <ConfDataContext.Provider value={{ userData, setUserData }}>
          {!userId && loginStatus === 'loggedOut' ? (
            <>
              <Header hero="Emojis Riddle" description="Faça login para continuar" />
              <Login onLogin={data => onLogin(data)} />
            </>
          ) : (
            <>
              <Header
                hero="Emojis Riddle"
                description="Adivinhe a resposta e ganhe pontos no Code-codes."
              />
              {GAMES_ENABLED ? (
                <EmojiRiddleForm userId={userId} />
              ) : (
                <p style={{ textAlign: 'center' }}>Jogos desabilitados.</p>
              )}
            </>
          )}
        </ConfDataContext.Provider>
      </Layout>
    </Page>
  );
}
