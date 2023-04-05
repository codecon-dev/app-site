/* eslint-disable @next/next/no-img-element */
import { useContext } from 'react';
import cn from 'classnames';

import ThemeContext from 'context/ThemeContext';

import styles from './TheTicket.module.scss';

type Props = {
    name?: string;
    username?: string;
    number?: number;
    responsive?: boolean;
};

export default function TheTicket({
    name = 'Seu nome',
    username = 'username',
    number = 0,
    responsive = true
}: Props) {
    const theme = useContext(ThemeContext);
    const numDigits = number.toString().length;
    const prefix = `00000`.slice(numDigits);

    return (
        <div
            className={cn(styles.ticket, styles[`theme-${theme}`], {
                [styles.responsive]: responsive
            })}
        >
            <div className={cn(styles.avatar, { [styles.responsive]: responsive })}>
                <img
                    src={
                        username !== 'username'
                            ? `https://github.com/${username}.png`
                            : '/images/ticket/user.png'
                    }
                />
            </div>
            <div className={cn(styles.name, { [styles.responsive]: responsive })}>
                <svg className={styles.title} viewBox="0 0 200 20">
                    <text x="0" y="15" fill="var(--color-white)">
                        {name}
                    </text>
                </svg>
                <svg className={styles.username} viewBox="0 0 300 20">
                    <text x="0" y="15" fill="var(--color-gray)">
                        @{username}
                    </text>
                </svg>
            </div>
            <svg
                className={cn(styles.number, { [styles.responsive]: responsive })}
                viewBox="0 0 100 20"
            >
                <text x="0" y="15" fill="var(--color-black)">
                    № {prefix}
                    {number}
                </text>
            </svg>
        </div>
    );
}
