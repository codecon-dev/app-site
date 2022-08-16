import { useEffect, useState } from 'react';

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log('login');

    setIsLoading(false);
  }, []);

  return [true, { name: 'John' }, isLoading];
};
