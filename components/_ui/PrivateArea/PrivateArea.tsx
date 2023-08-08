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
        const email = window.localStorage.getItem('codeconSummitEmail2023');
        const firstName = window.localStorage.getItem('codeconSummitFirstName2023') ?? '';
        const fullName = window.localStorage.getItem('codeconSummitFullName2023') ?? '';
        const acceptedTerms = window.localStorage.getItem('codeconSummitTerms2023');

        if (acceptedTerms === '0') {
            setShowTermsModal(true);
        }

        if (email) {
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

        const fullName = data.user.name.trim();
        const firstName = fullName.split(' ')[0];

        window.localStorage.setItem('codeconSummitEmail2023', data.user.email);
        window.localStorage.setItem('codeconSummitFullName2023', fullName);
        window.localStorage.setItem('codeconSummitFirstName2023', firstName);
        window.localStorage.setItem('codeconSummitTerms2023', data.user.acceptedTerms ? '1' : '0');

        setUserData({ firstName, fullName: fullName, email: data.user.email });
        toast.success(message);
    }

    function handleTermsModalAcceptance() {
        window.localStorage.setItem('codeconSummitTerms2023', '1');
        setShowTermsModal(false);
        toast.success('Obrigado e bom evento!');
    }

    if (isLoading) {
        return <div className={styles.loading} />;
    }

    if (showTermsModal) {
        return <TermsModal onAccept={handleTermsModalAcceptance} />;
    }

    if (userData) {
        return children;
    }

    return (
        <section className={styles.section}>
            <div className="container">
                <h3>Faça login para continuar</h3>

                <div className={styles.form}>
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
