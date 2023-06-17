import React, { useState, SyntheticEvent } from 'react';
import toast from 'react-hot-toast';

import { useUserData } from '@lib/hooks/useUserData';
import styles from './Form.module.scss';

type ApiResponse = {
    data: { success: boolean; message: string };
    success: boolean;
    message: string;
};

export default function Form() {
    const [guess, setGuess] = useState({
        stamp1: '',
        stamp2: '',
        stamp3: '',
        stamp4: '',
        stamp5: '',
        stamp6: '',
        stamp7: '',
        stamp8: '',
        stamp9: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [isRight, setIsRight] = useState(false);
    const { email } = useUserData();

    async function handleSubmit(e: SyntheticEvent): Promise<void> {
        e.preventDefault();

        if (!email) {
            toast.error('Ocorreu um erro inesperado!');
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch(`/api/games/mission/finish`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, guess })
            });

            const json = await response.json();

            setIsLoading(false);
            const { data, success, message }: ApiResponse = json;
            if (!success) {
                toast.error(message);
                return;
            }

            if (!data.success) {
                toast(message, { icon: '🤔' });
                return;
            }

            toast.success(message, {
                duration: 5000
            });
            setIsRight(true);
        } catch (error) {
            console.trace(error);
            setIsLoading(false);

            toast.error('Ops! Algo deu errado.');
            return;
        }
    }

    if (isRight) {
        return (
            <div>
                <br />
                <h3>✅ Boa! Você conseguiu!</h3>
            </div>
        );
    }

    return (
        <>
            <form className={styles.form} onSubmit={e => void handleSubmit(e)}>
                <input
                    type="text"
                    onChange={event => setGuess({ ...guess, stamp1: event.target.value })}
                    disabled={isLoading}
                    className={styles.input}
                    placeholder="Selo mágico 1"
                    required
                />
                <input
                    type="text"
                    onChange={event => setGuess({ ...guess, stamp2: event.target.value })}
                    disabled={isLoading}
                    className={styles.input}
                    placeholder="Selo mágico 2"
                    required
                />
                <input
                    type="text"
                    onChange={event => setGuess({ ...guess, stamp3: event.target.value })}
                    disabled={isLoading}
                    className={styles.input}
                    placeholder="Selo mágico 3"
                    required
                />
                <input
                    type="text"
                    onChange={event => setGuess({ ...guess, stamp4: event.target.value })}
                    disabled={isLoading}
                    className={styles.input}
                    placeholder="Selo mágico 4"
                    required
                />
                <input
                    type="text"
                    onChange={event => setGuess({ ...guess, stamp5: event.target.value })}
                    disabled={isLoading}
                    className={styles.input}
                    placeholder="Selo mágico 5"
                    required
                />
                <input
                    type="text"
                    onChange={event => setGuess({ ...guess, stamp6: event.target.value })}
                    disabled={isLoading}
                    className={styles.input}
                    placeholder="Selo mágico 6"
                    required
                />
                <input
                    type="text"
                    onChange={event => setGuess({ ...guess, stamp7: event.target.value })}
                    disabled={isLoading}
                    className={styles.input}
                    placeholder="Selo mágico 7"
                    required
                />
                <input
                    type="text"
                    onChange={event => setGuess({ ...guess, stamp8: event.target.value })}
                    disabled={isLoading}
                    className={styles.input}
                    placeholder="Selo mágico 8"
                    required
                />
                <input
                    type="text"
                    onChange={event => setGuess({ ...guess, stamp9: event.target.value })}
                    disabled={isLoading}
                    className={styles.input}
                    placeholder="Selo mágico 9"
                    required
                />
                <button
                    type="submit"
                    disabled={isLoading || !guess || !email}
                    className={styles.button}
                >
                    {isLoading ? 'Enviando...' : 'Tentar'}
                </button>
            </form>
        </>
    );
}
