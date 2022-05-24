import Page from '@components/page';
import Layout from '@components/layout';

import { META_DESCRIPTION } from '@lib/constants';
import Header from '@components/header';

export default function HowWorksPuzzles() {
  const meta = {
    title: `Enigmas - Codecon`,
    description: META_DESCRIPTION
  };

  return (
    <Page meta={meta}>
      <Layout hideNav hideFooter>
        <Header hero="Enigmas do Asaas" description="Como funciona" />
        <div className="container-max">
          <p>
            Um prédio em formato de farol é onde os enigmas se encontram. Cada andar dá a resposta a
            um enigma. Para participar, o usuário só precisa ir até o andar desejado, tentar
            descobrir qual a resposta para aquele enigma e enviar seu palpite interagindo (tecla
            `X`) com a Eli, um holograma da deusa responsável por criar os nossos enigmas.
          </p>
          <p>
            Para responder os enigmas você deverá fazer login com o seu código do pedido da
            inscrição do Sympla. O código pode ser encontrado logo no início do e-mail que você
            recebeu, logo abaixo da frase "Seus ingressos já estão disponíveis!", onde está escrito
            "Pedido: <b>TH012PD12</b>". Esse código é o que você deve usar para logar.
          </p>
          <p>
            Cada resposta certa dará um ponto no{' '}
            <a className="link" href="/game/enigmas">
              ranking dos enigmas
            </a>
            : os 3 primeiros colocados desse ranking ganham prêmios. Toda vez que você acertar um
            enigma, você também ganhará automaticamente 319 pontos no{' '}
            <a className="link" href="/game/code-codes">
              Code-codes
            </a>
            , nosso jogo de caça aos códigos do evento que também vale prêmios.
          </p>
          <p>A premiação dos enigmas será:</p>
          <ol>
            <li>Kindle + Camiseta da Codecon</li>
            <li>Headset da HyperX</li>
            <li>Impressão 3D personalizada do seu Skyline do GitHub</li>
          </ol>
          <p>
            Cada enigma pode ser respondido apenas uma vez por cada pessoa. As respostas são apenas
            uma palavra e podem estar em português ou inglês. Os enigmas são baseados no universo da
            programação e jogos (sejam analógicos ou digitais).
          </p>
          <p>
            As respostas serão aceitas até dia 25 de setembro de 2021, às 18h, horário de Brasília.
            Caso haja empate, os critérios de desempate serão, primeiro, quem acertou mais enigmas
            em menos tempo e, depois, sorteio.
          </p>
          <p>
            As premiações são válidas para participantes que moram no Brasil e o frete é por nossa
            conta. Entraremos em contato com os ganhadores por e-mail até 1 semana depois do evento
            para combinar a entrega da premiação.
          </p>
        </div>
      </Layout>
    </Page>
  );
}
