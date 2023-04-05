import { useEffect, useState, useRef, useContext } from 'react';
import cn from 'classnames';

import ThemeContext from 'context/ThemeContext';
import { SITE_URL } from '@lib/constants';
import IconCopy from '@components/_ui/Icons/icon-copy';

import styles from './TicketUrl.module.scss';

type Props = {
    username: string;
};

export default function TicketCopy({ username }: Props) {
    const theme = useContext(ThemeContext);
    const [copyEnabled, setCopyEnabled] = useState(false);
    const [copied, setCopied] = useState(false);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const url = `${SITE_URL}/${theme}/tickets/${username}`;
    useEffect(() => {
        if (navigator.clipboard) {
            setCopyEnabled(true);
        }
    }, []);

    const copiedText = (
        <span
            className={cn(styles.copied, {
                [styles.visible]: copied
            })}
        >
            Feito!
        </span>
    );

    const copyButton = (
        <button
            type="button"
            className={styles['button']}
            ref={buttonRef}
            onClick={() => {
                void navigator.clipboard.writeText(url).then(() => {
                    setCopied(true);
                    setTimeout(() => {
                        setCopied(false);
                    }, 2000);
                });
            }}
        >
            <IconCopy color="var(--color-gray)" />
        </button>
    );

    return (
        <div className={cn(styles.wrapper)}>
            <div>URL:</div>
            <div
                className={cn(styles.field, {
                    [styles['copy-disabled']]: !copyEnabled
                })}
            >
                <span className={styles.url}>{url}</span>
                <span className={cn(styles.fade)} />
                <div className={cn(styles['copy'])}>
                    {copiedText}
                    {copyButton}
                </div>
            </div>
        </div>
    );
}
