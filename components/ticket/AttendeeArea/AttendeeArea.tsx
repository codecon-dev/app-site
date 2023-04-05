import { useState } from 'react';
import cn from 'classnames';
import Attendee from 'src/database/model/Attendee';

import TheTicket from '../TheTicket';
import Form from '../Form';

import styles from './AttendeeArea.module.scss';

type FormState = 'default' | 'loading' | 'error';

type Props = {
    attendee: Attendee;
};

export default function AttendeeArea({ attendee }: Props) {
    return (
        <>
            <Form attendee={attendee} />
            <TheTicket />
        </>
    );
}
