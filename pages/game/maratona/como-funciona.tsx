import Page from '@components/page';
import Layout from '@components/layout';

import { META_DESCRIPTION } from '@lib/constants';
import Header from '@components/header';

export default function HowWorksMaratona() {
  const meta = {
    title: `Maratona JetBrains - Codecon`,
    description: META_DESCRIPTION
  };

  return (
    <Page meta={meta}>
      <Layout hideNav hideFooter>
        <Header hero="Maratona JetBrains" description="Como funciona" />
        <div className="container-max">
          <p>Horários de início dos jogos: 10h30 e 14h00.</p>
          <p>
            A Maratona de Programação da JetBrains é uma competição organizada pela BRUTE, o time de{' '}
            <i>competitive programming</i> da UDESC. Ela é baseada na Maratona de Programação SBC e
            acontecerá dentro da sala da Maratona do Gather.
          </p>
          <p>
            Para participar e concorrer aos prêmios, você deve primeiro ter um{' '}
            <a
              href="https://www.urionlinejudge.com.br/"
              target="_blank"
              rel="noopener noreferrer"
              className="link"
            >
              cadastro no URI
            </a>{' '}
            e depois preencher o formulário de interesse. No objeto ao lado aqui no Gather, onde
            deve informar como está seu nome no Gather e o seu link do perfil na URI.
          </p>
          <p>
            Serão duas competições de 1h30 durante o dia: a primeira começará às 10h30 da manhã. e a
            segunda às 14h00. Você deve escolher uma mesa na sala e apertar [X] no computador para
            abrir o link do desafio.
          </p>
          <p>
            A premiação será dada aos 3 primeiros colocados de cada maratona (de manhã e à tarde).
            Os prêmios serão:
          </p>
          <ol>
            <li>Amazon Echo Dot + Camiseta da Codecon</li>
            <li>Camiseta Codecon + Adesivos</li>
            <li>Impressão 3D personalizada do seu Skyline do GitHub</li>
          </ol>
          <p>
            Os participantes também ganharão pontos no{' '}
            <a className="link" href="/game/code-codes">
              Code-codes
            </a>
            , conforme a tabela abaixo:
          </p>
          <ol>
            <li>2189 pontos</li>
            <li>1353 pontos</li>
            <li>836 pontos</li>
            <li>517 pontos</li>
            <li>319 pontos</li>
            <li>197 pontos</li>
            <li>122 pontos</li>
            <li>75 pontos</li>
            <li>47 pontos</li>
            <li>29 pontos</li>
          </ol>
          <p>Quem ficar acima da 10ª posição ganhará 11 pontos.</p>
          <p>
            <b>Importante</b>: guarde seus códigos! Podemos solicitar após o fim da competição para
            confirmar que não houve trapaça. A organização se guarda o direito de eliminar um
            participante se perceber que ele trapaceou de qualquer forma.
          </p>
          <p>
            As premiações são válidas para participantes que moram no Brasil e o frete é por nossa
            conta. Entraremos em contato com os ganhadores por e-mail até 1 semana depois do evento
            para combinar a entrega dos prêmios.
          </p>
        </div>
      </Layout>
    </Page>
  );
}
