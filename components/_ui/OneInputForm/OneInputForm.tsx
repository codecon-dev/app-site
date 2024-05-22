import { ChangeEvent, FormEvent } from 'react';
import cn from 'classnames';

import styles from './OneInputForm.module.scss';

type Props = {
    value?: string;
    buttonText: string;
    placeholder?: string;
    handleSubmit: (event: FormEvent<Element>) => Promise<void>;
    handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
    disableSubmit?: boolean;
    isLoading?: boolean;
    inputType?: 'text' | 'email';
    horizontal?: boolean;
    allCaps?: boolean;
};

export default function OneInputForm({
    value,
    placeholder,
    handleSubmit,
    handleInputChange,
    disableSubmit,
    isLoading,
    buttonText,
    inputType = 'text',
    horizontal,
    allCaps
}: Props) {
    return (
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        <form
            className={cn(styles.form, { [styles.horizontal]: horizontal })}
            onSubmit={e => void handleSubmit(e)}
        >
            <input
                value={value}
                type={inputType}
                onChange={event => handleInputChange(event)}
                disabled={isLoading}
                className={styles.input}
                placeholder={placeholder}
                required
                style={allCaps ? { textTransform: 'uppercase' } : undefined}
            />
            <button type="submit" disabled={isLoading || disableSubmit} className={styles.button}>
                {isLoading ? 'Enviando...' : buttonText}
            </button>
        </form>
    );
}
