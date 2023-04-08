import { useState, useEffect, useContext } from 'react';
import cn from 'classnames';
import toast from 'react-hot-toast';

import { SITE_ORIGIN } from '@lib/constants';
import { GitHubOAuthData } from '@lib/types/all';
import Attendee from 'src/database/model/Attendee';
import ThemeContext from 'context/ThemeContext';

import styles from './Form.module.scss';
import IconGithub from '@components/_ui/Icons/icon-github';
import IconCheck from '@components/_ui/Icons/icon-check';

type FormState = 'default' | 'loading' | 'error';

type Props = {
    attendee: Attendee;
    setGithubData: (data: GitHubOAuthData) => void;
};

const githubEnabled = Boolean(process.env.NEXT_PUBLIC_GITHUB_OAUTH_CLIENT_ID);

export default function Form({ attendee, setGithubData }: Props) {
    const theme = useContext(ThemeContext);
    const [username, setUsername] = useState('');
    const [formState, setFormState] = useState<FormState>('default');

    useEffect(() => {
        if (attendee.githubFullName && attendee.githubUsername) {
            setUsername(attendee.githubUsername);
        }
    }, [attendee]);

    const handleButtonClick = () => {
        if (formState !== 'default') {
            setFormState('default');
            return;
        }

        setFormState('loading');

        if (!process.env.NEXT_PUBLIC_GITHUB_OAUTH_CLIENT_ID) {
            setFormState('error');
            toast.error('Erro de sincronização com o GitHub OAuth.');

            return;
        }

        const windowWidth = 600;
        const windowHeight = 700;
        let windowTop = 50;
        let windowLeft = 50;

        if (window.top) {
            windowTop = window.top.outerHeight / 2 + window.top.screenY - 700 / 2;
            windowLeft = window.top.outerWidth / 2 + window.top.screenX - 600 / 2;
        }

        const openedWindow = window.open(
            `https://github.com/login/oauth/authorize?client_id=${encodeURIComponent(
                process.env.NEXT_PUBLIC_GITHUB_OAUTH_CLIENT_ID
            )}`,
            'githubOAuth',
            `resizable,scrollbars,status,width=${windowWidth},height=${windowHeight},top=${windowTop},left=${windowLeft}`
        );

        new Promise<GitHubOAuthData | undefined>(resolve => {
            const interval = setInterval(() => {
                if (!openedWindow || openedWindow.closed) {
                    clearInterval(interval);
                    resolve(undefined);
                }
            }, 250);

            window.addEventListener('message', function onMessage(msgEvent) {
                if (SITE_ORIGIN !== msgEvent.origin || !msgEvent.data.id) {
                    return;
                }
                clearInterval(interval);
                if (openedWindow) {
                    openedWindow.close();
                }

                const githubData: GitHubOAuthData = msgEvent.data;

                resolve(githubData);
            });
        })
            .then(async data => {
                if (!data) {
                    setFormState('default');
                    return;
                }

                const usernameFromResponse = data.login;

                await fetch('/api/ticket/attendee', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        id: attendee.id,
                        username: data.login,
                        fullName: data.name
                    })
                });

                setGithubData(data);
                setUsername(usernameFromResponse);
                setFormState('default');

                // Prefetch GitHub avatar
                new Image().src = `https://github.com/${usernameFromResponse}.png`;

                // Prefetch the twitter share URL to eagerly generate the page
                fetch(`/${theme}/tickets/${usernameFromResponse}`).catch(_ => {});
            })
            .catch(() => {
                setFormState('error');
                toast.error('Eita! Algo deu errado, tente novamente.');
            });
    };

    return formState === 'error' ? (
        <div className={cn(styles.form, styles.error)}>
            <button
                type="button"
                className={cn(styles.button, styles.error)}
                onClick={() => {
                    setFormState('default');
                }}
            >
                Tentar novamente
            </button>
        </div>
    ) : (
        <div className={cn(styles['form'])}>
            <button
                className={cn(styles.button, styles[formState])}
                disabled={!githubEnabled || formState === 'loading' || Boolean(username)}
                onClick={handleButtonClick}
            >
                {formState === 'loading' ? (
                    <>Carregando...</>
                ) : username ? (
                    `@${username}`
                ) : (
                    'Gerar com GitHub'
                )}

                {username ? (
                    <span className={styles.icon}>
                        <IconCheck color="var(--color-dark-gray)" />
                    </span>
                ) : (
                    <span className={styles.icon}>
                        <IconGithub color="var(--color-dark-gray)" />
                    </span>
                )}
            </button>
            <p>Somente informações públicas serão usadas</p>
        </div>
    );
}
