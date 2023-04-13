import { useState, useContext, useEffect } from 'react';
import Image from 'next/image';
import cn from 'classnames';
import Attendee from 'src/database/model/Attendee';
import ThemeContext from 'context/ThemeContext';

import { Grid, Column } from '@components/_ui/Grid';
import { GitHubOAuthData } from '@lib/types/all';

import TheTicket from '../TheTicket';
import Form from '../GithubAuth';
import TicketActions from '../TicketActions';
import TicketUrl from '../TicketUrl';

import styles from './AttendeeArea.module.scss';

type Props = {
    attendee: Attendee;
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
                                Boa! Seu ticket da <span>Codecon foi gerado.</span>
                            </h2>
                            <p className="headline">
                                Para confirmar sua participação no sorteio, compartilhe nas redes
                                sociais.
                            </p>
                            <TicketActions
                                ticketNumber={attendee.id}
                                githubFullName={githubData.name}
                                githubUsername={githubData.login}
                            />
                            <TicketUrl username={githubData.login} />
                        </div>
                    ) : (
                        <div className={styles.content}>
                            Hey, {attendee.name}! 👋
                            <h2>
                                Quer concorrer a um <span>kit da Codecon?</span>
                            </h2>
                            <p className="headline">
                                É só gerar seu ticket e compartilhar nas redes sociais.
                            </p>
                            <Image
                                alt="Kit Codecon"
                                src="/images/ticket/kit-codecon.png"
                                width={497}
                                height={212}
                            />
                        </div>
                    )}
                </Column>
                <Column lg={7}>
                    <div className={styles.ticket}>
                        <TheTicket
                            name={githubData?.name}
                            username={githubData?.login}
                            number={attendee.id}
                        />
                        <Form attendee={attendee} setGithubData={setGithubData} />
                    </div>
                </Column>
            </Grid>
        </section>
    );
}
