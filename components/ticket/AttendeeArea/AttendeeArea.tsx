import { useState, useContext, useEffect } from 'react';
import Image from 'next/image';
import cn from 'classnames';
import { ConfAttendee } from '@lib/types/all';
import ThemeContext from 'context/ThemeContext';

import { Grid, Column } from '@components/_ui/Grid';
import { GitHubOAuthData } from '@lib/types/all';

import TheTicket from '../TheTicket';
import Form from '../GithubAuth';
import TicketActions from '../TicketActions';
import TicketUrl from '../TicketUrl';

import styles from './AttendeeArea.module.scss';

type Props = {
    attendee: ConfAttendee;
};

export default function AttendeeArea({ attendee }: Props) {
    const theme = useContext(ThemeContext);
    const [githubData, setGithubData] = useState<GitHubOAuthData | undefined>();

    useEffect(() => {
        if (attendee.githubFullName && attendee.githubUsername) {
            setGithubData({ login: attendee.githubUsername, name: attendee.githubFullName });
        }
    }, [attendee]);

    return (
        <section className={cn(styles.section, styles[`theme-${theme}`])}>
            <Grid align="center">
                <Column lg={5}>
                    {githubData ? (
                        <div className={styles.content}>
                            <h2>
                                Boa! Seu ticket <span>foi gerado.</span>
                            </h2>
                            <p className="headline">Compartilhe-o nas rede sociais.</p>
                            <TicketActions
                                ticketNumber={attendee.attendeeNumber ?? 0}
                                githubFullName={attendee.firstName || githubData.name}
                                githubUsername={githubData.login}
                            />
                            <TicketUrl username={githubData.login} />
                        </div>
                    ) : (
                        <div className={styles.content}>
                            Hey, {attendee.firstName}! 👋
                            <h2>
                                Mostre ao mundo que você estará na <span>Codecon Summit</span>
                            </h2>
                            <p className="headline">É só gerar seu ticket com o GitHub.</p>
                        </div>
                    )}
                </Column>
                <Column lg={7}>
                    <div className={styles.ticket}>
                        <TheTicket
                            name={attendee.firstName}
                            username={githubData?.login}
                            number={attendee.attendeeNumber}
                        />
                        <Form attendee={attendee} setGithubData={setGithubData} />
                    </div>
                </Column>
            </Grid>
        </section>
    );
}
