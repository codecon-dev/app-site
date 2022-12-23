import { useState, FormEvent } from 'react';
import toast from 'react-hot-toast';

import OneInputForm from '@components/2022/_ui/OneInputForm';
import { CodecodesClaimPayload } from '@lib/types/codecodes';
import { useUserData } from '@lib/hooks/useUserData';

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
    const { fullName, firstName, email } = useUserData();

    async function handleOnClaimSubmit(event: FormEvent) {
        event.preventDefault();
        if (!code) {
            toast.error('Por favor insira um código');
            return;
        }

        if (!fullName || !email) {
            toast.error('Não foi possível obter o usuário');
            return;
        }

        setIsLoading(true);
        const result = await claim({ code, name: fullName, email });

        if (!result.success) {
            toast.error(result.message as string);
        } else {
            setCode('');
            toast.success(result.message as string, {
                duration: 5000
            });
        }

        setIsLoading(false);
    }

    return (
        <section>
            <div className="container">
                <h3>Hey!</h3>
                <p>Digite abaixo o código que encontrou:</p>
                <br />
                <OneInputForm
                    handleSubmit={handleOnClaimSubmit}
                    handleInputChange={event => setCode(event.target.value)}
                    isLoading={isLoading}
                    disableSubmit={code === ''}
                    placeholder="Informe um código"
                    buttonText="Resgatar"
                />
            </div>
        </section>
    );
}
