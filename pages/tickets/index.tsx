import Head from 'next/head';
import PrivateArea from '@components/_ui/PrivateArea';

import Page from '@components/_ui/Page';
import AttendeeArea from '@components/ticket/AttendeeArea';
import { useUserData } from '@lib/hooks/useUserData';

export default function Ticket() {
    const [userData] = useUserData();

    return (
        <PrivateArea>
            <AttendeeArea attendee={userData} />
        </PrivateArea>
    );
}
