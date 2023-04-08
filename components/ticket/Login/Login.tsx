/* eslint-disable @next/next/no-img-element */
import { useContext, FormEvent, useState } from 'react';
import cn from 'classnames';
import toast from 'react-hot-toast';

import ThemeContext from 'context/ThemeContext';

import OneInputForm from '@components/_ui/OneInputForm/OneInputForm';
import IllustrationSympla from '../Illustrations/Sympla';
import IllustrationMail from '../Illustrations/Mail';
import IllustrationMagic from '../Illustrations/Magic';

import styles from './Login.module.scss';

const statusType = {
    default: 0,
    doubt: 1,
    orderOk: 2,
    hashSent: 3
};

export default function Login() {
    const theme = useContext(ThemeContext);
    const [status, setStatus] = useState(statusType.default);
    const [loading, setLoading] = useState(false);
    const [order, setOrder] = useState('');
    const [email, setEmail] = useState('');

    async function handleGetOrder(e: FormEvent) {
        e.preventDefault();

        setLoading(true);

        void (await fetch(`/api/sympla/${order}?event=${theme?.toUpperCase()}`, {
            method: 'GET'
        }).then(response => {
            if (!response.ok) {
                setLoading(false);
                toast.error('Eita! Pedido não encontrado.');
                return;
            }

            setLoading(false);
            setStatus(statusType.orderOk);
        }));
    }

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();

        setLoading(true);

        void (await fetch('/api/login/auth', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                order
            })
        }).then(response => {
            if (!response.ok) {
                setLoading(false);
                toast.error('Eita! Parece que esse não é o e-mail certo.');
                return;
            }

            setLoading(false);
            setStatus(statusType.hashSent);
        }));
    }

    return (
        <div className={cn(styles.wrapper, styles[`theme-${theme}`])}>
            <div className="container">
                {status === statusType.hashSent && (
                    <div className={styles.formContainer}>
                        <h2>
                            Te enviamos um ✨link mágico✨. <span>Verifique seu e-mail!</span>
                        </h2>
                        <div className={styles.illustration}>
                            <IllustrationMagic />
                        </div>
                        <br />
                        <p>É só clicar no link enviado para autenticar.</p>
                    </div>
                )}

                {status === statusType.orderOk && (
                    <div className={styles.formContainer}>
                        <h2>
                            Agora, informe seu email <span>para continuar</span>
                        </h2>
                        <div className={styles.illustration}>
                            <IllustrationMail />
                        </div>

                        <OneInputForm
                            isLoading={loading}
                            inputType="email"
                            handleInputChange={e => setEmail(e.target.value)}
                            handleSubmit={e => handleSubmit(e)}
                            placeholder="Seu e-mail de cadastro"
                            buttonText="Enviar link mágico"
                        />
                    </div>
                )}

                {status < 2 && (
                    <div className={styles.formContainer}>
                        <h2>
                            Informe o código do seu pedido do{' '}
                            <span>Sympla para importar seus dados</span>
                        </h2>
                        <div className={styles.illustration}>
                            <IllustrationSympla />
                        </div>
                        <OneInputForm
                            isLoading={loading}
                            handleInputChange={e => setOrder(e.target.value)}
                            handleSubmit={e => handleGetOrder(e)}
                            placeholder="Informe o código"
                            buttonText="Importar dados"
                        />

                        <a onClick={e => setStatus(statusType.doubt)} className={styles.link}>
                            Não sei onde está meu código
                        </a>
                    </div>
                )}

                {status === statusType.doubt && (
                    <div className={styles.formContainer}>
                        <br />
                        <img
                            src="/images/ticket/codigo-sympla.jpg"
                            title="Aqui está seu código"
                            width="100%"
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
