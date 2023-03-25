import { FormEvent, useState } from 'react';
// import styles from './login.module.css';
const styles = {} as any;

const statusType = {
    default: 0,
    doubt: 1,
    orderOk: 2,
    hashSent: 3
};

export default function Login() {
    const [status, setStatus] = useState(statusType.default);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [order, setOrder] = useState('');
    const [email, setEmail] = useState('');

    function handleGetOrder(e: FormEvent) {
        setError(false);
        setLoading(true);

        void fetch(`/api/sympla/${order}`, {
            method: 'GET'
        }).then(response => {
            console.log(response);
            if (!response.ok) {
                setLoading(false);
                setError(true);
                return;
            }

            setLoading(false);
            setStatus(statusType.orderOk);
        });

        e.preventDefault();
    }

    function handleSubmit(e: FormEvent) {
        setLoading(true);
        setError(false);

        void fetch('/api/auth', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email
            })
        }).then(response => {
            if (!response.ok) {
                setLoading(false);
                setError(true);
                return;
            }

            setLoading(false);
            setStatus(statusType.hashSent);
        });

        e.preventDefault();
    }

    return (
        <div className={styles.container}>
            {status > 1 && (
                <div className={styles.titleContainer}>
                    <img
                        src={status === statusType.hashSent ? '/logado.jpg' : '/login.jpg'}
                        title="Sou seu segurança"
                        width="200"
                    />
                </div>
            )}

            {status === statusType.hashSent && (
                <div className={styles.hashSent}>
                    <h3 className={styles.titleSent}>
                        Te enviamos um ✨link mágico✨. Verifique seu e-mail!
                    </h3>
                    <p>Agora é só clicar no link que tem lá para autenticar e let's que let's.</p>
                </div>
            )}

            {status === statusType.orderOk && (
                <div className={styles.formContainer}>
                    <form className={styles.form} onSubmit={e => handleSubmit(e)}>
                        <input
                            onChange={e => setEmail(e.target.value)}
                            type="text"
                            className={styles.input}
                            placeholder="Informe seu e-mail para continuar"
                        />
                        <button disabled={loading} type="submit" className={styles.submit}>
                            {loading ? (
                                <img width="32" src="banana-loading.gif" />
                            ) : (
                                'Enviar link mágico'
                            )}
                        </button>
                        {error && (
                            <p className={styles.error}>
                                Eita! Parece que esse e-mail não tem cadastro.
                            </p>
                        )}
                    </form>
                </div>
            )}

            {status < 2 && (
                <div className={styles.formContainer}>
                    <p>Já acessou aqui antes? Pode pular esta etapa.</p>
                    <button
                        onClick={e => setStatus(statusType.orderOk)}
                        type="submit"
                        className={styles.submit}
                    >
                        Pular essa etapa
                    </button>
                    <p>ou...</p>
                    <p>
                        Este é seu primeiro acesso? Precisamos do código do seu pedido no Sympla
                        para conseguir importar seus dados.
                    </p>
                    <form className={styles.form} onSubmit={e => handleGetOrder(e)}>
                        <input
                            onChange={e => setOrder(e.target.value)}
                            type="text"
                            className={styles.input}
                            placeholder="Informe o código do seu pedido"
                        />
                        <button disabled={loading} type="submit" className={styles.submit}>
                            {loading ? (
                                <img width="32" src="banana-loading.gif" />
                            ) : (
                                'Importar dados'
                            )}
                        </button>
                        <a onClick={e => setStatus(statusType.doubt)} className={styles.link}>
                            Não sei onde tá meu código
                        </a>
                        {error && <p className={styles.error}>Eita! Pedido não encontrado.</p>}
                    </form>
                </div>
            )}

            {status === statusType.doubt && (
                <div className={styles.titleContainer}>
                    <img src="/obvious.jpeg" title="Tá com duvida?" width="200" /> &nbsp;
                    <img src="/codigo-sympla.jpg" title="Aqui está seu código" width="500" />
                </div>
            )}
        </div>
    );
}
