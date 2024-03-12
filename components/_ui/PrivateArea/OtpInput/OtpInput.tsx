import oneInputFormStyles from '@components/_ui/OneInputForm/OneInputForm.module.scss';
import privateAreaStyles from '@components/_ui/PrivateArea/PrivateArea.module.scss';
import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import OtpInput from 'react-otp-input';
import { ConfAttendee } from '@lib/types/all';
import ApiResponse from 'src/api/ApiResponse';

type Props = {
    attendeeUuid: string;
    onSuccess: (data: ConfAttendee) => void;
};

export default function Otp({ attendeeUuid, onSuccess }: Props) {
    const [otp, setOtp] = useState('');
    const [isLoading, setLoading] = useState<boolean>(false);

    const handleSubmit = useCallback(async () => {
        try {
            setLoading(true);

            const response = await fetch(`/api/login/check`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ attendeeUuid, otp })
            });

            const json = await response.json();
            const { data, success, message }: ApiResponse = json;

            if (!success) {
                toast.error(message.join('\n'));
                return;
            }

            toast.success('Logado com sucesso!');
            onSuccess(data as ConfAttendee);
        } catch (error) {
            if (error instanceof Error) {
                toast.error(`Ocorreu um erro desconhecido [${error.message}]`);
                return;
            }

            toast.error(`Ocorreu um erro desconhecido [${error}]`);
        } finally {
            setLoading(false);
        }
    }, [attendeeUuid, onSuccess, otp]);

    useEffect(() => {
        if (otp.length === 6) {
            void handleSubmit();
        }
    }, [handleSubmit, otp]);

    return (
        <section className={privateAreaStyles.section}>
            <div className="container">
                <h3>Te enviamos um ✨código mágico✨.</h3>

                <span>Verifique seu e-mail!</span>

                <div className={privateAreaStyles.form}>
                    <div className={oneInputFormStyles.form}>
                        <OtpInput
                            shouldAutoFocus
                            inputStyle={oneInputFormStyles['otp-input']}
                            skipDefaultStyles
                            value={otp}
                            onChange={setOtp}
                            numInputs={6}
                            renderInput={props => <input {...props} />}
                        />

                        <button
                            type="button"
                            onClick={() => void handleSubmit()}
                            disabled={otp.length < 6}
                            className={oneInputFormStyles.button}
                        >
                            {isLoading ? 'Enviando...' : 'Continuar'}
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
