import { ChangeEvent, FormEvent } from 'react';

import styles from './OneInputForm.module.scss';

type Props = {
    buttonText: string;
    placeholder?: string;
    handleSubmit: (event: FormEvent<Element>) => Promise<void>;
    handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
    disableSubmit?: boolean;
    isLoading?: boolean;
    inputType?: 'text' | 'email';
};

export default function OneInputForm({
    placeholder,
    handleSubmit,
    handleInputChange,
    disableSubmit,
    isLoading,
    buttonText,
    inputType = 'text'
}: Props) {
    return (
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        <form className={styles.form} onSubmit={handleSubmit}>
            <input
                type={inputType}
                onChange={event => handleInputChange(event)}
                disabled={isLoading}
                className={styles.input}
                placeholder={placeholder}
                required
            />
            <button type="submit" disabled={isLoading || disableSubmit} className={styles.button}>
                {isLoading ? 'Enviando...' : buttonText}
            </button>
        </form>
    );
}
