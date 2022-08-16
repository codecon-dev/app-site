import React, { ReactElement } from 'react';
import { useLogin } from '@hooks/useLogin';

import styles from './PrivateArea.module.scss';

type Props = {
  children: ReactElement;
};

export default function PrivateArea({ children }: Props) {
  const [isUserLoggedIn, userData, isLoading] = useLogin();

  return (
    <>
      {isLoading ? (
        <p>Carregando...</p>
      ) : isUserLoggedIn ? (
        <>{React.cloneElement(children, { data: userData })}</>
      ) : (
        <p>Não logado</p>
      )}
    </>
  );
}
