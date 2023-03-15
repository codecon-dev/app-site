import Image from 'next/image';
import Link from 'next/link';

import Page from '@components/_ui/Page';

export default function ComoFunciona() {
    const meta = {
        title: 'Como funciona Code-codes - Codecon Digital 2022',
        image: '/images/share-image.png'
    };

    return (
        <Page theme="digital" meta={meta} hideNav hideFooter>
            <div className="container container-text">
                <h2>Code-codes</h2>
                <h3>Como funciona</h3>
                <p>O code-codes é uma caça aos ✨ tokens secretos ✨.</p>
                <p>
                    Durante nosso evento, você vai poder resgatar códigos que irão valer pontos em
                    uma competição e os 10 primeiros colocados ganham prêmios incríveis.
                </p>
                <p>
                    Esse jogo foi criado para que você participe o máximo possível do evento. Por
                    isso, os tokens podem ser resgatados de várias formas: respondendo enigmas,
                    tendo uma boa posição na maratona de programação, encontrando bugs espalhados
                    pelo mapa, pegando códigos que os hosts divulgarem durante as apresentações,
                    visitando stands de patrocinadores e comunidades, entre outros. Toda atividade
                    pode valer um código e quem sabe se você tiver sorte, pode até encontrar um bug
                    dourado.
                </p>
                <p>
                    O resgate é feito em uma área específica do nosso mapa. No segundo andar, você
                    encontrará o personagem <b>Pensador Profundo</b>. Nele, você poderá digitar o
                    código obtido para resgatar seus merecidos pontos. Algumas atividades contarão
                    com um formato diferente, como os Enigmas que possuem resgate automático e a
                    Escape Room que possui uma sala especifica para resgate.
                </p>
                <p>
                    Para conseguir realizar o resgate dos seus pontos você deverá fazer login com o
                    seu e-mail e cada resgate dará pontos específicos para cada código: alguns valem
                    mais; outros, menos. Os pontos serão contados para o{' '}
                    <Link href="/game/code-codes">
                        <a className="link">ranking do code-codes</a>
                    </Link>
                    , onde os 10 primeiros colocados ganham prêmios.
                </p>
                <p>A premiação do code-codes será:</p> <br></br>
                <Image
                    src="/images/como-funciona/prizes.png"
                    alt="Imagem de um Playstation 5, uma mesa GenioDesk Plus e um Teclado Logitech MX Keys Mini"
                    width={662}
                    height={335}
                    layout="responsive"
                />
                <ol>
                    <li>PlayStation 5 + 1 ano de Rocketseat Plus </li>
                    <li>Mesa GenioDesks + 1 ano de Rocketseat Plus </li>
                    <li>Teclado Logitech MX Keys Mini + 1 ano de Rocketseat Plus</li>
                    <li>Fone Bluetooth Anker Soundcore Life Q30 + 6 meses de Rocketseat Plus</li>
                    <li>Mouse Logitech MX Master 3 + 6 meses de Rocketseat Plus</li>
                    <li> Divoom Ditoo plus + 6 meses de Rocketseat Plus</li>
                    <li>Kindle + 3 meses de Rocketseat Plus</li>
                    <li>
                        Microfone Razer Seiren + Ebook Casa do Código + 3 meses de Rocketseat Plus
                    </li>
                    <li>
                        Fone Galaxy Buds Live + Ebook Casa do Código + 3 meses de Rocketseat Plus
                    </li>
                    <li>Amazon Echo Dot +Ebook Casa do Código + 3 meses de Rocketseat Plus</li>
                </ol>
                <br></br>
                <p>
                    O ranking será desabilitado no dia 24 de setembro de 2022 às 17h, mas os
                    resgates serão aceitos até às 18:00, horário de Brasília. Os{' '}
                    <strong>ganhadores serão divulgados às 19:00 nas nossas redes sociais</strong>.
                    Caso haja empate, os critérios de desempate serão: quem mais fez resgates; quem
                    fez o primeiro resgate antes e sorteio. Nessa ordem.
                </p>
                <p>
                    As premiações são válidas para participantes que moram no Brasil e o frete é por
                    nossa conta. Entraremos em contato com os ganhadores por e-mail até 1 semana
                    depois do evento para combinar a entrega da premiação.
                </p>
                <p>
                    Este jogo não aceita trapaças ou formas de tentar resgatar códigos burlando o
                    sistema. A organização tem o direito de remover os pontos que forem
                    identificados como fraudulentos ou até excluir o participante da competição.
                </p>
            </div>
        </Page>
    );
}
