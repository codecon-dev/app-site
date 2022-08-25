import React, { ReactElement, useState, SyntheticEvent, useEffect } from 'react';
import toast from 'react-hot-toast';

import OneInputForm from '@components/_ui/OneInputForm';
import { useUserData } from '@lib/hooks/useUserData';

type Props = {
    puzzlePublicId: string;
};

type ApiResponse = {
    data: { success: boolean; message: string };
    success: boolean;
    message: string;
};

export default function Form({ puzzlePublicId }: Props) {
    const [guess, setGuess] = useState('');
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

        const response = await fetch(`/api/games/puzzle/answer`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, guess, puzzlePublicId })
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

        toast.success(message);
        setIsRight(true);
    }

    if (isRight) {
        return (
            <section>
                <div className="container">
                    <h3>✅ Boa! Você acertou.</h3>
                </div>
            </section>
        );
    }

    return (
        <section>
            <div className="container">
                <OneInputForm
                    handleSubmit={handleSubmit}
                    handleInputChange={event => setGuess(event.target.value)}
                    isLoading={isLoading}
                    placeholder="Seu chute"
                    buttonText="Tentar"
                    disableSubmit={!guess || !email}
                />
            </div>
        </section>
    );
}