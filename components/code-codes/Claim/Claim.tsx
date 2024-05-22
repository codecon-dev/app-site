import { useState, FormEvent } from 'react';
import toast from 'react-hot-toast';

import OneInputForm from '@components/_ui/OneInputForm';
import { CodecodesClaimPayload } from '@lib/types/codecodes';
import { useUserData } from '@lib/hooks/useUserData';
import shoot from '@lib/confetti';

async function claim(payload: CodecodesClaimPayload) {
    const response = await fetch('/api/codecodes/claim', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    });
    return response.json();
}

export default function CodecodesClaimForm() {
    const [code, setCode] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [userData] = useUserData();

    async function handleOnClaimSubmit(event: FormEvent) {
        event.preventDefault();
        if (!code) {
            toast.error('Por favor insira um código');
            return;
        }

        if (!userData.attendeeUuid) {
            toast.error('Não foi possível obter o usuário');
            return;
        }

        setIsLoading(true);
        const result = await claim({
            code,
            name: userData.displayName as string,
            attendeeUuid: userData.attendeeUuid
        });

        setIsLoading(false);
        setCode('');

        if (!result.success) {
            toast.error(result.message as string);
        } else {
            toast.success(result.message as string, {
                duration: 5000
            });
            await shoot(window.innerWidth / 2, window.innerHeight / 2);
        }
    }

    return (
        <section>
            <div className="container">
                <h2 style={{ textAlign: 'center' }}>Resgate</h2>
                <p style={{ textAlign: 'center' }}>Digite abaixo o código que encontrou:</p>
                <OneInputForm
                    value={code}
                    handleSubmit={handleOnClaimSubmit}
                    handleInputChange={event => setCode(event.target.value)}
                    isLoading={isLoading}
                    disableSubmit={code === ''}
                    placeholder="Informe um código"
                    buttonText="Resgatar"
                    allCaps
                />
            </div>
        </section>
    );
}
