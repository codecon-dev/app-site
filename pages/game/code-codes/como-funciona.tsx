import Page from '@components/page';
import Layout from '@components/layout';

import { META_DESCRIPTION } from '@lib/constants';
import Header from '@components/header';

export default function HowWorksCodeCodes() {
  const meta = {
    title: `Code-codes - Codecon`,
    description: META_DESCRIPTION
  };

  return (
    <Page meta={meta}>
      <Layout hideNav hideFooter>
        <Header hero="Code-codes" description="Como funciona" />
        <div className="container-max">
          <img src="/premios.png" alt="Premiação Code-codes" width="100%" />
          <br />
          <br />
          <p>
            O code-codes é uma caça aos tokens secretos. Durante nosso evento, você vai poder
            resgatar códigos que irão valer pontos em uma competição em que os 10 primeiros
            colocados ganham prêmios incríveis.
          </p>
          <p>
            Esse jogo foi criado para que você participe o máximo possível do evento. Por isso, os
            tokens podem ser resgatados de várias formas: respondendo enigmas, participando das
            nossas charadas de emoji, tendo uma boa posição na maratona de programação, encontrando
            códigos espalhados pelo mapa, pegando códigos que os hosts divulgarem durante as
            apresentações, visitando estandes de patrocinadores e vários outros escondidos.
          </p>
          <p>
            O resgate é feito em uma área específica do nosso mapa, onde você encontrará o
            personagem Pensador Profundo. Nele, você poderá digitar um código para resgatar seus
            merecidos pontos. Algumas atividades também contarão com resgate automático, como os
            enigmas e as charadas de emoji.
          </p>
          <p>
            Para realizar o resgate você deverá fazer login com o seu código do pedido da inscrição
            do Sympla. O código pode ser encontrado logo no início do e-mail que você recebeu, logo
            abaixo da frase "Seus ingressos já estão disponíveis!", onde está escrito "Pedido:{' '}
            <b>TH012PD12</b>". Esse código é o que você deve usar para logar.
          </p>
          <p>
            Cada resgate dará pontos específicos para cada código: alguns valem mais; outros, menos.
            Os pontos serão contados para o{' '}
            <a className="link" href="/game/code-codes">
              ranking do code-codes
            </a>
            , onde os 10 primeiros colocados ganham prêmios.
          </p>
          <p>A premiação do code-codes será:</p>
          <ol>
            <li>
              <a
                className="link"
                href="https://slik.com.br/mesa-com-regulagem-de-altura-eletrica/mesa-escritorio-selectia-2/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Uma mesa com regulagem de altura digital da Slikdesk
              </a>{' '}
              <strong>OU</strong> um Xbox Series S
            </li>
            <li>O prêmio que o primeiro colocado não escolher</li>
            <li>Teclado mecânico Keychron</li>
            <li>Mouse Logitech MX Master 3</li>
            <li>Amazon Echo Dot + Lâmpada inteligente</li>
            <li>Camiseta Codecon + Impressão 3D do seu Skyline do GitHub</li>
            <li>Camiseta Codecon</li>
            <li>Camiseta Codecon</li>
            <li>Camiseta Codecon</li>
            <li>Adesivos Codecon</li>
          </ol>
          <p>
            Este jogo não aceita trapaças ou formas de tentar resgatar códigos burlando o sistema. A
            organização tem o direito de remover os pontos que forem identificados como fraudulentos
            ou até excluir o participante da competição.
          </p>
          <p>
            As respostas serão aceitas até dia 25 de setembro de 2021, às 18h, horário de Brasília.
            Às 17h do mesmo dia, o ranking será desabilitado e os ganhadores divulgados às 18h30 nas
            nossas redes sociais. Caso haja empate, os critérios de desempate serão: quem mais fez
            resgates; quem fez o primeiro resgate antes; sorteio.
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
