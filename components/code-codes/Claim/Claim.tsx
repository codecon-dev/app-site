import { useState, FormEvent } from 'react';
import toast from 'react-hot-toast';

import OneInputForm from '@components/_ui/OneInputForm';
import { CodecodesClaimPayload } from '@lib/types/codecodes';

type Props = {
  firstName: string;
  fullName: string;
  email: string;
};

async function claim({ code, name, email }: CodecodesClaimPayload) {
  const response = await fetch('/api/codecodes/claim', {
    method: 'POST',
    body: JSON.stringify({
      code,
      name,
      email
    })
  });
  return response.json();
}

export default function CodecodesClaimForm({ firstName, fullName, email }: Props) {
  const [code, setCode] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function handleOnClaimSubmit(event: FormEvent) {
    event.preventDefault();
    if (!code) {
      toast('Por favor insira um código');
      return;
    }

    if (!fullName || !email) {
      toast('Não foi possível obter o usuário');
      return;
    }

    setIsLoading(true);
    const result = await claim({ code, name: fullName, email });

    if (result.status !== 'success' || result.error) {
      toast.error(result.error.message as string);
    } else {
      toast(result.message as string);
    }

    setIsLoading(false);
  }

  return (
    <section>
      <div className="container">
        <h3>Hey, {firstName}! Digite abaixo o código que encontrou:</h3>
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
