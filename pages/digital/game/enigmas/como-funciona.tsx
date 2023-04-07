import Link from 'next/link';

import Page from '@components/_ui/Page';

export default function ComoFunciona() {
    const meta = {
        title: 'Como funciona - Enigmas - Codecon Digital 2022'
    };

    return (
        <Page theme="digital" meta={meta} hideNav hideFooter>
            <div className="container container-text">
                <h2>Enigmas da Olist</h2>
                <h3>Como funciona</h3>
                <p>
                    Cada andar dá a resposta a um enigma. Para participar, o usuário só precisa ir
                    até o andar desejado, interagir com a Eli (tecla `X`), tentar descobrir qual a
                    resposta para aquele enigma e enviar seu palpite no campo. Eli é um holograma da
                    deusa responsável por criar os nossos enigmas.
                </p>
                <p>
                    Para responder os enigmas você deverá fazer login com o seu e-mail da inscrição
                    do Sympla.
                </p>
                <p>
                    Cada resposta certa dará um ponto no{' '}
                    <Link href="/game/enigmas">
                        <span className="link">ranking dos enigmas</span>
                    </Link>
                    : os 10 primeiros colocados desse ranking ganham prêmios. Toda vez que você
                    acertar um enigma, você também ganhará automaticamente 319 pontos (o número de
                    pontos vai diminuindo a cada resgate, sendo que o valor mínimo que você ganhará
                    é 197 pontos) no Code-codes, nosso jogo de caça aos códigos do evento que também
                    vale prêmios.
                </p>
                <p>A premiação dos enigmas será:</p>
                <br />
                <ol>
                    <li>Fone Edifier W820NB</li>
                    <li>Kindle </li>
                    <li>Camiseta Codecon</li>
                    <li>Camiseta Codecon</li>
                    <li>Ebook Casa do Código</li>
                    <li>Ebook Casa do Código</li>
                    <li>Adesivos Codecon</li>
                    <li>Adesivos Codecon</li>
                    <li>Adesivos Codecon</li>
                    <li>Adesivos Codecon</li>
                </ol>
                <br />
                <p>
                    Cada enigma pode ser respondido apenas uma vez por cada pessoa. As respostas
                    poder ser uma palavra ou duas palavras e podem estar em português ou inglês. Os
                    enigmas são baseados no universo da programação e matrix.
                </p>
                <p>
                    As respostas serão aceitas até dia 24 de setembro de 2022, às 18h, horário de
                    Brasília. Caso haja empate, os critérios de desempate serão, primeiro, quem
                    acertou mais enigmas em menos tempo e, depois, sorteio.
                </p>
                <p>
                    As premiações são válidas para participantes que moram no Brasil e o frete é por
                    nossa conta. Entraremos em contato com os ganhadores por e-mail até 1 semana
                    depois do evento para combinar a entrega da premiação.
                </p>
            </div>
        </Page>
    );
}
