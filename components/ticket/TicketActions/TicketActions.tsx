import { useContext } from 'react';
import cn from 'classnames';

import ThemeContext from 'context/ThemeContext';
import { SITE_URL } from '@lib/constants';
import IconTwitter from '@components/_ui/Icons/icon-twitter';
import LinkedinIcon from '@components/_ui/Icons/icon-linkedin';
import Whatsapp from '@components/_ui/Icons/icon-whatsapp';
import InstagramIcon from '@components/_ui/Icons/icon-instagram';

import styles from './TicketActions.module.scss';

type Props = {
    ticketNumber: number;
    githubFullName: string;
    githubUsername: string;
};

export default function TicketActions({ ticketNumber, githubFullName, githubUsername }: Props) {
    const theme = useContext(ThemeContext);
    const permalink = encodeURIComponent(`${SITE_URL}/tickets/${githubUsername}`);
    const tweetUrl = `https://twitter.com/intent/tweet?url=${permalink}&via=codecondev&text=Já garanti minha inscrição!`;
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${permalink}`;

    const params = {
        name: githubFullName,
        username: githubUsername,
        ticketNumber: ticketNumber,
        event: theme
    };

    const downloadUrl = `/api/ticket/stories/?params=${btoa(JSON.stringify(params))}`;

    return (
        <div className={styles.share}>
            <span className={styles.text}>Compartilhe:</span>
            <a
                className={cn(
                    styles.button,
                    // LinkedIn Share widget doesn’t work on mobile
                    styles['linkedin-button']
                )}
                href={linkedInUrl}
                rel="noopener noreferrer"
                target="_blank"
            >
                <LinkedinIcon size={24} color="var(--color-black)" />
            </a>
            <a
                className={cn(styles.button)}
                href={tweetUrl}
                rel="noopener noreferrer"
                target="_blank"
            >
                <IconTwitter color="var(--color-black)" size={24} />
            </a>
            <a className={cn(styles.button)} href={downloadUrl} download="ticket.png">
                <InstagramIcon size={24} color="var(--color-black)" />
            </a>
        </div>
    );
}
