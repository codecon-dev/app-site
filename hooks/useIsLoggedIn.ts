import { ConfUser } from '@lib/types/all';
import { useEffect, useState } from 'react';

export const useIsLoggedIn = (callback: (data?: ConfUser) => void) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const email = window.localStorage.getItem('codeconEmail');
    const firstName = window.localStorage.getItem('codeconFirstName');
    const fullName = window.localStorage.getItem('codeconFullName');

    if (email && firstName && fullName) {
      callback({ firstName, fullName, email });
    }

    setIsLoading(false);
  }, [callback]);

  return isLoading;
};
