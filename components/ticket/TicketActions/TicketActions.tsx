import { useState, useRef, useEffect, useContext } from 'react';
import cn from 'classnames';

import Attendee from 'src/database/model/Attendee';
import ThemeContext from 'context/ThemeContext';
import { SITE_URL } from '@lib/constants';
import IconTwitter from '@components/_ui/Icons/icon-twitter';
import LinkedinIcon from '@components/_ui/Icons/icon-linkedin';
import Whatsapp from '@components/_ui/Icons/icon-whatsapp';
import InstagramIcon from '@components/_ui/Icons/icon-instagram';

import styles from './TicketActions.module.scss';

type Props = {
    attendee: Attendee;
};

export default function TicketActions({ attendee }: Props) {
    const theme = useContext(ThemeContext);
    const [imgReady, setImgReady] = useState(false);
    const [loading, setLoading] = useState(false);
    const downloadLink = useRef<HTMLAnchorElement>();
    const permalink = encodeURIComponent(`${SITE_URL}/${theme}/tickets/${attendee.githubUsername}`);
    const tweetUrl = `https://twitter.com/intent/tweet?url=${permalink}&via=codecondev&text=Já garanti minha inscrição!`;
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${permalink}`;
    const whatsappText = encodeURIComponent('Já garanti minha inscrição!');
    const whatsappUrl = `https://wa.me/?text=${whatsappText} ${permalink}`;

    const params = {
        name: attendee.githubFullName,
        username: attendee.githubUsername,
        ticketNumber: attendee.id,
        event: 'digital'
    };

    const downloadUrl = `/api/ticket/stories/?params=${btoa(JSON.stringify(params))}`;

    useEffect(() => {
        setImgReady(false);

        const img = new Image();

        img.src = downloadUrl;
        img.onload = () => {
            setImgReady(true);
            setLoading(false);
            if (downloadLink.current) {
                downloadLink.current.click();
                downloadLink.current = undefined;
            }
        };
    }, [downloadUrl]);

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
            <a
                className={cn(styles.button)}
                href={whatsappUrl}
                rel="noopener noreferrer"
                target="_blank"
            >
                <Whatsapp size={24} color="var(--color-black)" />
            </a>
            <a
                className={cn(styles.button, {
                    [styles.loading]: loading
                })}
                href={loading ? undefined : downloadUrl}
                onClick={e => {
                    if (imgReady) return;

                    e.preventDefault();
                    downloadLink.current = e.currentTarget;
                    // Wait for the image download to finish
                    setLoading(true);
                }}
                download="ticket.png"
            >
                <InstagramIcon size={24} color="var(--color-black)" />
            </a>
        </div>
    );
}
