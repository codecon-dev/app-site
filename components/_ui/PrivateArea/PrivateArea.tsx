import React, { ReactElement, useState, SyntheticEvent, useEffect } from 'react';
import Image from 'next/image';
import toast from 'react-hot-toast';

import OneInputForm from '../OneInputForm';
import User from 'src/database/model/User';
import { ConfUser } from '@lib/types/all';

import styles from './PrivateArea.module.scss';
import TermsModal from './TermsModal';

type Props = {
    children: ReactElement;
};

type LoginResponse = { data: { user: User }; success: boolean; message: string };

export default function PrivateArea({ children }: Props) {
    const [email, setEmail] = useState('');
    const [userData, setUserData] = useState<ConfUser>();
    const [isLoading, setIsLoading] = useState(true);
    const [showTermsModal, setShowTermsModal] = useState(false);

    useEffect(() => {
        const email = window.localStorage.getItem('codeconEmail');
        const firstName = window.localStorage.getItem('codeconFirstName');
        const fullName = window.localStorage.getItem('codeconFullName');
        const acceptedTerms = window.localStorage.getItem('codeconTerms');

        if (acceptedTerms === '0') {
            setShowTermsModal(true);
        }

        if (email && firstName && fullName) {
            setUserData({ firstName, fullName, email });
        }

        setIsLoading(false);
    }, []);

    async function handleSubmit(e: SyntheticEvent): Promise<void> {
        e.preventDefault();

        const response = await fetch(`/api/login/check`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email })
        });

        const json = await response.json();
        const { data, success, message }: LoginResponse = json;
        if (!success) {
            toast.error(message);
            return;
        }

        if (!data.user.acceptedTerms) {
            setShowTermsModal(true);
        }

        const firstName = data.user.name.split(' ')[0];

        window.localStorage.setItem('codeconEmail', data.user.email);
        window.localStorage.setItem('codeconFullName', data.user.name);
        window.localStorage.setItem('codeconFirstName', firstName);
        window.localStorage.setItem('codeconTerms', data.user.acceptedTerms ? '1' : '0');

        setUserData({ firstName, fullName: data.user.name, email: data.user.email });
        toast.success(message);
    }

    function handleTermsModalAcceptance() {
        window.localStorage.setItem('codeconTerms', '1');
        setShowTermsModal(false);
        toast.success('Obrigado e bom evento!');
    }

    if (isLoading) {
        return <div className={styles.loading} />;
    }

    if (showTermsModal) {
        return <TermsModal onAccept={handleTermsModalAcceptance} />;
    }

    if (userData || window.location.hostname === 'localhost') {
        return children;
    }

    return (
        <section>
            <div className="container">
                <h3>Faça login para continuar</h3>

                <div className={styles.form}>
                    <Image src="/icons/locked.svg" width={100} height={100} />
                    <OneInputForm
                        handleSubmit={handleSubmit}
                        handleInputChange={event => setEmail(event.target.value)}
                        placeholder="Seu e-mail cadastrado"
                        buttonText="Fazer login"
                        inputType="email"
                        disableSubmit={!email}
                    />
                </div>
            </div>
        </section>
    );
}
