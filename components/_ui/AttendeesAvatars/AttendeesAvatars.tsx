/* eslint-disable @next/next/no-img-element */
import React, { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';

import ThemeContext from 'context/ThemeContext';
import Attendee from 'src/database/model/Attendee';

import styles from './AttendeesAvatars.module.scss';

export default function AttendeesAvatars() {
    const [attendeesAvatars, setAttendessAvatars] = useState<Attendee[]>();
    const [attendeesCount, setAttendessCount] = useState(0);
    const theme = useContext(ThemeContext);

    useEffect(() => {
        async function getAttendees() {
            const event = theme?.toUpperCase();

            await axios.get(`/api/ticket/attendee?event=${event}`).then(function (response) {
                const { attendees, count }: { attendees: Attendee[]; count: number } =
                    response.data.data;

                setAttendessAvatars(attendees);
                setAttendessCount(count);
            });
        }

        void getAttendees();
    }, [theme]);

    if (!attendeesAvatars || attendeesAvatars.length < 5) return null;

    return (
        <div className={styles.section}>
            <div className={styles.avatars}>
                {attendeesAvatars.map(({ githubUsername, githubFullName }) => (
                    <Link
                        key={githubUsername}
                        className={styles.avatar}
                        href={`${theme}/tickets/${githubUsername}`}
                        title={githubFullName}
                    >
                        <img
                            alt={githubFullName}
                            src={`https://github.com/${githubUsername}.png`}
                        />
                    </Link>
                ))}
            </div>
            <p>
                {attendeesCount < 500 ? (
                    <>vários devs e devas já garantiram seu ticket</>
                ) : (
                    <>+{attendeesCount} já garantiram seu ticket</>
                )}
            </p>
        </div>
    );
}
