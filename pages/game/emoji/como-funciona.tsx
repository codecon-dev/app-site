import Page from '@components/page';
import Layout from '@components/layout';

import { META_DESCRIPTION } from '@lib/constants';
import Header from '@components/header';

export default function HowWorksEmoji() {
  const meta = {
    title: `Charadas de Emoji - Codecon`,
    description: META_DESCRIPTION
  };

  return (
    <Page meta={meta}>
      <Layout hideNav hideFooter>
        <Header hero="Emoji Riddle" description="Como funciona" />
        <div className="container-max">
          <p>
            Este é um jogo que vai matar a saudade de todos que participaram das edições da Codecon Digital
            que teve como principal canal o Discord. Lá, a gente tinha o famoso Codebot, um "bot"
            que conversava com as pessoas e dava desafios de charadas de emoji para as pessoas
            acertarem.
          </p>
          <p>
            As charadas são relacionadas ao mundo da programação e de games, podendo ser o nome de
            pessoas, tecnologias, nome de jogos, objetos de jogos ou boas práticas.
          </p>
          <p>
            O jogo funciona em uma área específica do nosso mapa, onde você encontrará o personagem
            Codebot, e poderá responder quantas charadas quiser. Ao responder todas, o jogo se
            encerra (são mais de 40).
          </p>
          <p>
            Para participar os enigmas você deverá fazer login com o seu código do pedido da
            inscrição do Sympla. O código pode ser encontrado logo no início do e-mail que você
            recebeu, logo abaixo da frase "Seus ingressos já estão disponíveis!", onde está escrito
            "Pedido: <b>TH012PD12</b>". Esse código é o que você deve usar para logar.
          </p>
          <p>
            Toda vez que você acertar uma charada, 47 pontos serão computados automaticamente na sua conta do
            Code-codes. Os pontos serão contabilizados no{' '}
            <a className="link" href="/game/code-codes">
              ranking do code-codes
            </a>
            , onde os 10 primeiros colocados ganham prêmios.
          </p>
        </div>
      </Layout>
    </Page>
  );
}
