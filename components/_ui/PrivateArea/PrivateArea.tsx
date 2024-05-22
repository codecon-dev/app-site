import { ReactElement, SyntheticEvent, useCallback, useEffect, useState } from 'react';
import { notFound } from 'next/navigation';
import Head from 'next/head';
import toast from 'react-hot-toast';

import { ConfAttendee } from '@lib/types/all';
import OneInputForm from '../OneInputForm';
import CompleteYourRegistration from './CompleteYourRegistration';
import TermsModal from './TermsModal';
import OtpInput from './OtpInput';
import styles from './PrivateArea.module.scss';
import { useUserData } from '@lib/hooks/useUserData';
import Page from '../Page';
import IconLogo from '../Icons/icon-logo';

type Props = {
    children: ReactElement;
    onlyAdmin?: boolean;
};

type WrapperProps = {
    children: ReactElement;
    hideNavAndFooter?: boolean;
};

const statusType = {
    default: 0,
    hashSent: 1,
    completeRegistration: 2,
    termsModal: 3,
    finished: 4
};

type LoginResponse = {
    data: { uuid: string };
    success: boolean;
    message: string;
};

function Wrapper({ children, hideNavAndFooter }: WrapperProps) {
    const meta = {
        title: `Área do inscrito - Codecon`
    };

    return (
        <>
            <Head>
                <meta name="robots" content="noindex" />
            </Head>
            <Page
                meta={meta}
                theme="summit"
                hideNav={hideNavAndFooter}
                hideFooter={hideNavAndFooter}
            >
                {children}
            </Page>
        </>
    );
}

export default function PrivateArea({ children, onlyAdmin }: Props) {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState(statusType.default);
    const [attendeeUuid, setAttendeeUuid] = useState('');
    const [formLoading, setFormLoading] = useState(false);
    const [userData, isLoadingUserData] = useUserData();

    const updateStatusByUserData = useCallback((data: ConfAttendee) => {
        if (!data.hasMobilePhone) {
            setStatus(statusType.completeRegistration);
        } else if (!data.hasAcceptedTerms) {
            setStatus(statusType.termsModal);
        } else {
            setStatus(statusType.finished);
        }
    }, []);

    useEffect(() => {
        if (!userData.attendeeUuid) return;

        setAttendeeUuid(userData.attendeeUuid);

        updateStatusByUserData(userData);
    }, [userData, updateStatusByUserData]);

    async function handleSubmit(e: SyntheticEvent): Promise<void> {
        e.preventDefault();
        setFormLoading(true);

        const response = await fetch(`/api/login/auth`, {
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

        setAttendeeUuid(data.uuid);
        setStatus(statusType.hashSent);
        toast.success(message);
    }

    function handleStepFinished(data: ConfAttendee): void {
        updateStatusByUserData(data);
    }

    if (isLoadingUserData) {
        return (
            <Wrapper>
                <div className={styles.loading} />
            </Wrapper>
        );
    }

    if (!attendeeUuid) {
        return (
            <Wrapper hideNavAndFooter>
                <section className={styles.section}>
                    <div className="container">
                        <div className={styles.logo}>
                            <IconLogo theme="summit" />
                        </div>
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
            </Wrapper>
        );
    }

    if (status === statusType.hashSent) {
        return (
            <Wrapper hideNavAndFooter>
                <>
                    <div className={styles.logo}>
                        <IconLogo theme="summit" />
                    </div>
                    <OtpInput attendeeUuid={attendeeUuid} onSuccess={handleStepFinished} />
                </>
            </Wrapper>
        );
    }

    if (status === statusType.completeRegistration) {
        return (
            <Wrapper hideNavAndFooter>
                <>
                    <div className={styles.logo}>
                        <IconLogo theme="summit" />
                    </div>
                    <CompleteYourRegistration
                        attendeeUuid={attendeeUuid}
                        displayNameUser={userData.displayName}
                        onSuccess={handleStepFinished}
                    />
                </>
            </Wrapper>
        );
    }

    if (status === statusType.termsModal) {
        return (
            <Wrapper hideNavAndFooter>
                <TermsModal attendeeUuid={attendeeUuid} onAccept={handleStepFinished} />
            </Wrapper>
        );
    }

    if (onlyAdmin && !userData.isAdmin) {
        return (
            <Wrapper>
                <div style={{ textAlign: 'center', margin: '50px 0' }}>Acesso restrito.</div>
            </Wrapper>
        );
    }

    return <Wrapper>{children}</Wrapper>;
}
