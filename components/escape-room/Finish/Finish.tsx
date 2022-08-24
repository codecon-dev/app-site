import React, { useState, SyntheticEvent } from 'react';
import toast from 'react-hot-toast';

import OneInputForm from '@components/_ui/OneInputForm';
import { useUserData } from '@lib/hooks/useUserData';
import Image from 'next/image';

type ApiResponse = {
    data: { success: boolean; message: string };
    success: boolean;
    message: string;
};

export default function Finish() {
    const [userMessage, setUserMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [finished, setFinished] = useState(false);
    const { firstName, email } = useUserData();

    async function handleSubmit(e: SyntheticEvent): Promise<void> {
        e.preventDefault();

        if (!email) {
            toast.error('Ocorreu um erro inesperado!');
            return;
        }

        setIsLoading(true);

        const response = await fetch(`/api/games/escape-room/finish`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, message: userMessage })
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
        setFinished(true);
    }

    if (finished) {
        return (
            <section>
                <div className="container">
                    <h3>✅ Tudo certo! Obrigado.</h3>
                </div>
            </section>
        );
    }

    return (
        <section>
            <div className="container">
                <Image src="/animations/sati.webp" width={241} height={170} />
                <br />
                <br />
                <h3>Hey, {firstName}!</h3>
                <p>Que bom que você chegou até aqui!</p>
                <p>
                    Para validar sua finalização da escape room e contabilizar seus pontos, escreva
                    abaixo <strong>EUESTIVEAQUI</strong> e clique em salvar!
                </p>
                <br />
                <OneInputForm
                    handleSubmit={handleSubmit}
                    handleInputChange={event => setUserMessage(event.target.value)}
                    isLoading={isLoading}
                    placeholder="Escreva aqui"
                    buttonText="Salvar"
                    disableSubmit={!userMessage || !email}
                />
            </div>
        </section>
    );
}
