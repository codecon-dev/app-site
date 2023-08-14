import { ReactElement, SyntheticEvent, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import { ConfUser } from '@lib/types/all';
import User from 'src/database/model/User';
import OneInputForm from '../OneInputForm';

import CompleteYourRegistration from './CompleteYourRegistration';
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
    const [formLoading, setFormLoading] = useState(false);
    const [showCompleteYourRegistration, setShowCompleteYourRegistration] = useState(false);
    const [showTermsModal, setShowTermsModal] = useState(false);

    useEffect(() => {
        const email = window.localStorage.getItem('codeconSummitEmail2023') ?? '';
        const firstName = window.localStorage.getItem('codeconSummitFirstName2023') ?? '';
        const fullName = window.localStorage.getItem('codeconSummitFullName2023') ?? '';
        const mobilePhone = window.localStorage.getItem('codeconSummitMobilePhone2023') ?? '';
        const displayName = window.localStorage.getItem('codeconSummitDisplayName2023') ?? '';
        const acceptedTerms = window.localStorage.getItem('codeconSummitTerms2023');

        const hasEmail = email.length > 0
        const hasMobilePhone = mobilePhone.length > 0

        if (hasEmail && !hasMobilePhone) {
            setShowCompleteYourRegistration(true);
        } else if (acceptedTerms === '0') {
            setShowTermsModal(true);
        }

        if (hasEmail) {
            setUserData({ firstName, fullName, email, mobilePhone, displayName });
        }

        setIsLoading(false);
    }, []);

    async function handleSubmit(e: SyntheticEvent): Promise<void> {
        e.preventDefault();
        setFormLoading(true);

        const response = await fetch(`/api/login/check`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email })
        });

        const json = await response.json();
        const { data, success, message }: LoginResponse = json;

        setFormLoading(false);

        if (!success) {
            toast.error(message);
            return;
        }

        if (!data.user.mobilePhone) {
            setShowCompleteYourRegistration(true);
        } else if (!data.user.acceptedTerms) {
            setShowTermsModal(true);
        }

        const fullName = data.user.name.trim();
        const firstName = fullName.split(' ')[0];

        window.localStorage.setItem('codeconSummitEmail2023', data.user.email);
        window.localStorage.setItem('codeconSummitFullName2023', fullName);
        window.localStorage.setItem('codeconSummitFirstName2023', firstName);
        window.localStorage.setItem('codeconSummitTerms2023', data.user.acceptedTerms ? '1' : '0');
        window.localStorage.setItem('codeconSummitMobilePhone2023', data.user.mobilePhone ?? '');
        window.localStorage.setItem('codeconSummitDisplayName2023', data.user.displayName ?? firstName);

        setUserData({ 
            firstName,
            fullName,
            email: data.user.email, 
            mobilePhone: data.user.mobilePhone, 
            displayName: data.user.displayName ?? firstName
        });
        toast.success(message);
    }

    function handleCompleteYouRegistrationFinish(mobilePhone: string, displayName: string, message: string): void {
        window.localStorage.setItem('codeconSummitMobilePhone2023', mobilePhone);
        window.localStorage.setItem('codeconSummitDisplayName2023', displayName);
        setShowCompleteYourRegistration(false);
        toast.success(message);

        const acceptedTerms = window.localStorage.getItem('codeconSummitTerms2023');

        if (acceptedTerms === '0') {
            setShowTermsModal(true);
        }
    }

    function handleTermsModalAcceptance() {
        window.localStorage.setItem('codeconSummitTerms2023', '1');
        setShowTermsModal(false);
        toast.success('Obrigado e bom evento!');
    }

    if (isLoading) {
        return <div className={styles.loading} />;
    }

    const hasMobilePhone = !!window.localStorage.getItem("codeconSummitMobilePhone2023")?.length
    if (showCompleteYourRegistration && !hasMobilePhone) {
        return <CompleteYourRegistration onSuccess={handleCompleteYouRegistrationFinish} />;
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
                        isLoading={formLoading}
                    />
                </div>
            </div>
        </section>
    );
}
