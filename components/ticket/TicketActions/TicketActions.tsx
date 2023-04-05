import { useState, useRef, useEffect, useContext } from 'react';
import cn from 'classnames';

import ThemeContext from 'context/ThemeContext';
import { SITE_URL } from '@lib/constants';
import IconTwitter from '@components/_ui/Icons/icon-twitter';
import LinkedinIcon from '@components/_ui/Icons/icon-linkedin';
import styles from './TicketActions.module.scss';
import Whatsapp from '@components/_ui/Icons/icon-whatsapp';

type Props = {
    username: string;
    ticketNumber: number | undefined;
};

export default function TicketActions({ username, ticketNumber }: Props) {
    const theme = useContext(ThemeContext);
    const [imgReady, setImgReady] = useState(false);
    const [loading, setLoading] = useState(false);
    const downloadLink = useRef<HTMLAnchorElement>();
    const permalink = encodeURIComponent(`${SITE_URL}/${theme}/tickets/${username}`);
    const tweetUrl = `https://twitter.com/intent/tweet?url=${permalink}&via=codecondev&text=Já garanti minha inscrição!`;
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${permalink}`;
    const whatsappText = encodeURIComponent('Já garanti minha inscrição!');
    const whatsappUrl = `https://wa.me/?text=${whatsappText} ${permalink}`;
    const downloadUrl = `/api/ticket-images/${ticketNumber}?theme=${theme}&format=stories`;

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
                className={cn(styles.button, styles.download, {
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
                Download
            </a>
        </div>
    );
}
