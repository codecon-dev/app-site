import oneInputFormStyles from '@components/_ui/OneInputForm/OneInputForm.module.scss';
import privateAreaStyles from '@components/_ui/PrivateArea/PrivateArea.module.scss';
import { useUserData } from '@lib/hooks/useUserData';
import { FormEvent, useState } from 'react';
import toast from 'react-hot-toast';
import PhoneInput from 'react-phone-input-international';
import ApiResponse from 'src/api/ApiResponse';

type Props = {
    onSuccess: (mobilePhone: string, displayName: string, message: string) => void;
};

export default function CompleteYourRegistration({ onSuccess }: Props) {
    const [mobilePhone, setMobilePhone] = useState<string>('');
    const [displayName, setDisplayName] = useState<string>('');
    const [isLoading, setLoading] = useState<boolean>(false);
    const { email } = useUserData();

    async function handleSubmit(event: FormEvent) {
        try {
            setLoading(true);
            event.preventDefault();

            const response = await fetch(`/api/login/complete-registration`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, mobilePhone, displayName })
            });

            const json = await response.json();
            const { success, message }: ApiResponse = json;
            if (!success) {
                toast.error(message.join("\n"));
                return;
            }

            onSuccess(mobilePhone, displayName, message[0]);
        } catch (error) {
            if (error instanceof Error) {
                toast.error(`Ocorreu um erro desconhecido [${error.message}]`);
                return;
            }

            toast.error(`Ocorreu um erro desconhecido [${error}]`);
        } finally {
            setLoading(false);
        }
    }

    return (
        <section className={privateAreaStyles.section}>
            <div className="container">
                <h3>Complete seu cadastro para continuar</h3>

                <div className={privateAreaStyles.form}>
                    <form className={oneInputFormStyles.form} onSubmit={event => void handleSubmit(event)}>
                        <PhoneInput
                            country='br'
                            disableDropdown={true}
                            inputClass={oneInputFormStyles.input}
                            specialLabel='Não usaremos seu número para enviar anúncios 🤞'
                            inputProps={{ required: true, autoFocus: true }}
                            placeholder='Digite seu telefone'
                            value={mobilePhone}
                            onChange={phone => setMobilePhone(phone)}
                        />

                        <input
                            type="text"
                            className={oneInputFormStyles.input}
                            placeholder="Como devemos te chamar?"
                            value={displayName}
                            onChange={event => setDisplayName(event.target.value)}
                            required
                        />

                        <button type="submit" disabled={mobilePhone.length < 5 || !displayName.length} className={oneInputFormStyles.button}>
                            {isLoading ? 'Salvando...' : 'Continuar'}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}
