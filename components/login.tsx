import { FormEvent, useState } from 'react';
import useConfData, { UserData } from '@lib/hooks/use-conf-data';
import LoadingDots from './loading-dots';
import styles from './login.module.css';
import TermsModal from './terms-modal';

const statusType = {
  default: 0,
  doubt: 1,
  orderOk: 2,
  hashSent: 3
};

export default function Login({ onLogin }: { onLogin: (data: UserData) => void }) {
  const [status, setStatus] = useState(statusType.default);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [email, setEmail] = useState('');
  const [userId, setUserId] = useState('');
  const [showTermsModal, setShowTermsModal] = useState(false);
  const { setUserData } = useConfData();

  function handleGetOrder(e: FormEvent) {
    setError(false);
    setLoading(true);

    getOrder();

    e.preventDefault();
  }

  function getOrder() {
    void fetch(`/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email })
    })
      .then(response => response.json())
      .then(data => {
        if (!data.email) {
          setLoading(false);
          setError(true);
          return;
        }

        setLoading(false);
        setUserId(data.ticketNumber);

        if (!data.acceptedTerms) {
          openAcceptModal();
          return;
        }

        setUserData(data);
        window.localStorage.setItem('symplaLogin', `${data.email}:${data.ticketNumber}`);
        onLogin(data);
      });
  }

  function openAcceptModal() {
    setShowTermsModal(true);
  }

  function handleAcceptModal() {
    setLoading(true);
    setShowTermsModal(false);
    getOrder();
  }

  return (
    <div className={styles.container}>
      {showTermsModal && <TermsModal onAccept={() => handleAcceptModal()} userId={userId} />}
      <div className={styles.formContainer}>
        <p>Informe o e-mail que usou para se inscrever</p>
        <form className={styles.form} onSubmit={e => handleGetOrder(e)}>
          <input
            onChange={e => setEmail(e.target.value)}
            type="text"
            className={styles.input}
            placeholder="Seu e-mail"
          />
          <button disabled={loading} type="submit" className={styles.submit}>
            {loading ? <LoadingDots size={4} /> : 'Acessar área restrita'}
          </button>
          {error && <p className={styles.error}>Eita! Email não encontrado.</p>}
        </form>
      </div>
    </div>
  );
}
