import { useEffect, useState } from 'react';
import { ConfUser } from '@lib/types/all';

export function useUserData() {
    const [userData, setUserData] = useState<ConfUser>();

    useEffect(() => {
        const email = window.localStorage.getItem('codeconEmail23');
        const firstName = window.localStorage.getItem('codeconFirstName23') ?? '';
        const fullName = window.localStorage.getItem('codeconFullName23') ?? '';

        if (email) {
            setUserData({ firstName, fullName, email });
        }
    }, []);

    return { email: userData?.email, firstName: userData?.firstName, fullName: userData?.fullName };
}
