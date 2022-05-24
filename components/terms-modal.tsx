import { FormEvent, useState } from 'react';
import LoadingDots from './loading-dots';
import styles from './login.module.css';

export default function TermsModal({ onAccept, userId }: { onAccept: () => void; userId: string }) {
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: FormEvent) {
    setLoading(true);

    void fetch(`/api/terms/${userId}`, {
      method: 'GET'
    })
      .then(response => response.json())
      .then(data => {
        onAccept();
        setLoading(false);
      });

    e.preventDefault();
  }

  return (
    <div className={styles.modal}>
      <form className={styles.modalForm} onSubmit={e => handleSubmit(e)}>
        <main>
          <p>
            Ao fazer login aqui, você estará automaticamente participando do{' '}
            <strong>Code-codes</strong>, nosso jogo de caça aos tokens secretos. Durante o evento
            você vai poder resgatar códigos que valerão pontos no ranking geral e os 10 primeiros
            ganham prêmios.
          </p>
          <p>
            Esse jogo foi criado para que você participe o máximo possível do evento, por isso os
            token podem ser regatados de várias formas: respondendo enigmas, participando das nossas
            charadas de emoji, tendo uma boa posição na maratona de programação, encontrar códigos
            espalhados pelo mapa, pegar códigos que os hosts podem divulgar durante as
            apresentações, visitar estandes de patrocinadores e vários outros escondidos.
          </p>
          <p>
            O resgate é feito em uma área específica do nosso mapa, onde você encontrará o
            personagem <strong>Pensador Profundo</strong>, nele você poderá digitar um código para
            resgatá-lo. Algumas atividades também contarão com resgate automático, como os Enigmas e
            as charadas de emoji.
          </p>
          <p>
            Ao aceitar estes termos você entende que este jogo não aceita trapaças ou formas de
            tentar resgatar códigos tentando burlar o sistema. A organização tem o direito de
            remover os pontos que foram identificados como fraudulentos ou até te excluir da
            competição.
          </p>
          <p>
            Lembrando que a premiação é válida para residentes do Brasil e o frete é por nossa
            conta.
          </p>
          <p>Jogue de boa, tente encontrar os tokens escondidos e boa sorte!</p>
        </main>
        <button className={styles.submit} type="submit">
          {loading ? <LoadingDots size={4} /> : 'Aceitar os termos e fechar'}
        </button>
      </form>
    </div>
  );
}
