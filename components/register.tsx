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

import { useState, useEffect } from 'react';
import { PageState, ConfDataContext, UserData } from '@lib/hooks/use-conf-data';
import useLoginStatus from '@lib/hooks/use-login-status';
import Ticket from './ticket';
import ConfContainer from './conf-container';
import Login from './login';
import Header from '@components/header';
import LoadingDots from './loading-dots';
import styles from './register.module.css';

type Props = {
  defaultUserData: UserData;
  sharePage?: boolean;
};

export default function Cadastro({ defaultUserData, sharePage }: Props) {
  const [userData, setUserData] = useState<UserData>(defaultUserData);
  const { data, loginStatus, mutate } = useLoginStatus();

  useEffect(() => {
    if (!data) return;
    setUserData(data.userData);
  }, [loginStatus]);

  if (loginStatus === 'loading') {
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
      <ConfContainer>
        {loginStatus === 'loggedOut' && !sharePage ? (
          <>
            <Header hero="Área VIP" description="Faça login para continuar" />
            <Login onLogin={() => mutate()} />
          </>
        ) : (
          <Ticket
            username={userData.username}
            name={userData.name}
            ticketNumber={userData.ticketNumber}
            sharePage={sharePage}
          />
        )}
      </ConfContainer>
    </ConfDataContext.Provider>
  );
}
