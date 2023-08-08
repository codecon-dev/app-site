import { useEffect, useState } from 'react';
import { ConfUser } from '@lib/types/all';

export function useUserData() {
    const [userData, setUserData] = useState<ConfUser>();

    useEffect(() => {
        const email = window.localStorage.getItem('codeconSummitEmail2023');
        const firstName = window.localStorage.getItem('codeconSummitFirstName2023') ?? '';
        const fullName = window.localStorage.getItem('codeconSummitFullName2023') ?? '';

        if (email) {
            setUserData({ firstName, fullName, email });
        }
    }, []);

    return { email: userData?.email, firstName: userData?.firstName, fullName: userData?.fullName };
}
