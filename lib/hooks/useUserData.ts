import { useEffect, useState } from 'react';
import { getCookie } from 'cookies-next';

import ApiResponse from 'src/api/ApiResponse';
import { ConfAttendee } from '@lib/types/all';

export function useUserData(): [ConfAttendee, boolean] {
    const [userData, setAttendeeData] = useState<ConfAttendee>({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const attendeeUuid = getCookie('attendeeUuid');

        if (!attendeeUuid) {
            setLoading(false);
            return;
        }

        async function getAttendeeData() {
            const response = await fetch(`/api/login/auth?uuid=${attendeeUuid}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const json = await response.json();
            const { data, success }: ApiResponse = json;

            if (success) {
                setAttendeeData({
                    attendeeNumber: data.attendeeNumber,
                    attendeeUuid: data.attendeeUuid,
                    firstName: data.firstName,
                    displayName: data.displayName,
                    hasMobilePhone: data.hasMobilePhone,
                    hasAcceptedTerms: data.hasAcceptedTerms,
                    githubFullName: data.githubFullName,
                    githubUsername: data.githubUsername,
                    isAdmin: data.isAdmin
                });
            }

            setLoading(false);
        }

        void getAttendeeData();
    }, []);

    return [userData, loading];
}
