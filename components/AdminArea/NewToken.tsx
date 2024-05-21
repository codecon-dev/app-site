import { useState } from 'react';

import { useUserData } from '@lib/hooks/useUserData';
import { CodecodesToken } from '@lib/types/codecodes';

import styles from './AdminArea.module.scss';

export default function NewToken() {
    const [userData] = useUserData();
    const [loading, setLoading] = useState(false);
    const [tokenData, setTokenData] = useState<CodecodesToken>({
        code: '',
        description: '',
        value: 0
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setTokenData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setLoading(true);
            const tokenDataSanitized = tokenData;

            tokenDataSanitized.createdBy = userData?.displayName;

            if (tokenData.expireAt) {
                const mmddyyDate = tokenData.expireAt.replace(/(.*?)\/(.*?)\//, '$2/$1/');
                const utcDate = new Date(mmddyyDate);
                const expireAt = utcDate.toISOString();

                tokenDataSanitized.expireAt = expireAt;
            }

            const response = await fetch('/api/codecodes/token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(tokenDataSanitized)
            }).then(res => res.json());

            setLoading(false);

            if (!response.success) {
                throw new Error(response.message as string);
            }

            alert('Token criado com sucesso!');

            setTokenData({
                code: '',
                description: '',
                value: 0
            });
        } catch (error) {
            alert(error);
        }
    };

    return (
        <div>
            <h2>Novo token</h2>
            <form className={styles.form} onSubmit={e => void handleSubmit(e)}>
                <label htmlFor="code">Código (/^[a-zA-Z0-9]+$/):</label>
                <input
                    type="text"
                    id="code"
                    name="code"
                    value={tokenData.code}
                    onChange={handleChange}
                    required
                />
                <label htmlFor="description">Descrição:</label>
                <input
                    type="text"
                    id="description"
                    name="description"
                    value={tokenData.description}
                    onChange={handleChange}
                    className={styles.bigger}
                    required
                />
                <label htmlFor="value">Quantos pontos esse token vale?</label>
                <input
                    type="number"
                    id="value"
                    name="value"
                    value={tokenData.value}
                    onChange={handleChange}
                    required
                />
                <label htmlFor="decreaseValue">
                    Esse token vai valer menos a cada resgate? Se sim, quantos pontos?
                </label>
                <input
                    type="number"
                    id="decreaseValue"
                    name="decreaseValue"
                    value={tokenData.decreaseValue || ''}
                    onChange={handleChange}
                />
                <label htmlFor="minimumValue">Qual o valor mínimo para os pontos?</label>
                <input
                    type="number"
                    id="minimumValue"
                    name="minimumValue"
                    value={tokenData.minimumValue || ''}
                    onChange={handleChange}
                />
                <label htmlFor="totalClaims">
                    Esse token terá limite de usos? Se sim, quantos?
                </label>
                <input
                    type="number"
                    id="totalClaims"
                    name="totalClaims"
                    value={tokenData.totalClaims || ''}
                    onChange={handleChange}
                />
                <label htmlFor="expireAt">
                    Esse token terá data limite? Se sim, qual? (DD/MM/AA HH:MM em GMT -3)
                </label>
                <input
                    type="text"
                    id="expireAt"
                    name="expireAt"
                    value={tokenData.expireAt || ''}
                    onChange={handleChange}
                />
                <button disabled={loading} type="submit">
                    {loading ? 'Criando...' : 'Salvar'}
                </button>
            </form>
        </div>
    );
}
