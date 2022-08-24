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
  const { email } = useUserData();

  async function handleSubmit(e: SyntheticEvent): Promise<void> {
    e.preventDefault();

    if (!email) {
      toast.error('Ocorreu um erro inesperado!');
      return;
    }

    const response = await fetch(`/api/games/puzzle/answer`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, guess, puzzlePublicId })
    });

    const json = await response.json();
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
  }

  return (
    <section>
      <div className="container">
        <OneInputForm
          handleSubmit={handleSubmit}
          handleInputChange={event => setGuess(event.target.value)}
          placeholder="Seu chute"
          buttonText="Tentar"
          disableSubmit={!guess || !email}
        />
      </div>
    </section>
  );
}
