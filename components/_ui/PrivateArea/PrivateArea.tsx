import { ReactElement, SyntheticEvent, useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import { ConfAttendee } from '@lib/types/all';
import OneInputForm from '../OneInputForm';
import CompleteYourRegistration from './CompleteYourRegistration';
import TermsModal from './TermsModal';
import OtpInput from './OtpInput';
import styles from './PrivateArea.module.scss';
import { useUserData } from '@lib/hooks/useUserData';

type Props = {
    children: ReactElement;
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

export default function PrivateArea({ children }: Props) {
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
        return <div className={styles.loading} />;
    }

    if (!attendeeUuid) {
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

    if (status === statusType.hashSent) {
        return <OtpInput attendeeUuid={attendeeUuid} onSuccess={handleStepFinished} />;
    }

    if (status === statusType.completeRegistration) {
        return (
            <CompleteYourRegistration attendeeUuid={attendeeUuid} onSuccess={handleStepFinished} />
        );
    }

    if (status === statusType.termsModal) {
        return <TermsModal attendeeUuid={attendeeUuid} onAccept={handleStepFinished} />;
    }

    return children;
}
