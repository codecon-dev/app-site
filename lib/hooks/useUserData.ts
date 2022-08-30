import { useEffect, useState } from 'react';
import { ConfUser } from '@lib/types/all';

export function useUserData() {
  const [userData, setUserData] = useState<ConfUser>();

  useEffect(() => {
    const email = window.localStorage.getItem('codeconEmail');
    const firstName = window.localStorage.getItem('codeconFirstName');
    const fullName = window.localStorage.getItem('codeconFullName');

    if (email && firstName && fullName) {
      setUserData({ firstName, fullName, email });
    }
  }, []);

  return { email: userData?.email, firstName: userData?.firstName, fullName: userData?.fullName };
}
