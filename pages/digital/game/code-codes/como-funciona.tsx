import Image from 'next/image';
import Link from 'next/link';

import Header from '@components/_ui/Header';
import Page from '@components/_ui/Page';

export default function ComoFunciona() {
    const meta = {
        title: 'Como funciona Code-codes - Codecon Digital'
    };

    return (
        <Page theme="digital" meta={meta} hideNav hideFooter>
            <Header title="Code-codes" description="Como funciona" layoutText />
            <div className="container container-text">
                <p>O code-codes é uma caça aos ✨ tokens secretos ✨.</p>
                <p>
                    Durante nosso evento, você vai poder resgatar códigos que irão valer pontos em
                    uma competição e os 10 primeiros colocados ganham prêmios incríveis.
                </p>
                <p>
                    Esse jogo foi criado para que você participe o máximo possível do evento. Por
                    isso, os tokens podem ser resgatados de várias formas: respondendo enigmas,
                    encontrando bugs espalhados pelo mapa, pegando códigos que os hosts divulgarem
                    durante as apresentações, visitando stands de patrocinadores e comunidades,
                    entre outros. Toda atividade pode valer um código e quem sabe se você tiver
                    sorte, pode até encontrar um bug dourado.
                </p>
                <p>
                    O resgate é feito em uma área específica do nosso mapa. No mapa Code-codes, você
                    encontrará o personagem <b>Pensador Profundo</b>. Nele, você poderá digitar o
                    código obtido para resgatar seus merecidos pontos. Algumas atividades contarão
                    com um formato diferente, como os Enigmas que possuem resgate automático, por
                    exemplo.
                </p>
                <p>
                    Para conseguir realizar o resgate dos seus pontos você deverá fazer login com o
                    seu e-mail e cada resgate dará pontos específicos para cada código: alguns valem
                    mais; outros, menos. Os pontos serão contados para o{' '}
                    <Link href="/digital/game/code-codes">
                        <span className="link">ranking do code-codes</span>
                    </Link>
                    , onde os 10 primeiros colocados ganham prêmios.
                </p>
                <p>A premiação do code-codes será:</p> <br></br>
                <ol>
                    <li>Nintendo Switch + 1 ano de Rocketseat Plus + Adesivos</li>
                    <li>Mesa GenioDesks + 1 ano de Rocketseat Plus + Adesivos</li>
                    <li>Mouse Logitech MX Master 3 + 1 ano de Rocketseat Plus + Adesivos</li>
                    <li>Fone Edifier W800BT + 1 ano de Rocketseat Plus + Adesivos</li>
                    <li>Fone QCY T20 + 1 livro da Editora Novatec à sua escolha + Adesivos</li>
                    <li>Camiseta Codecon + 1 livro da Editora Novatec à sua escolha + Adesivos</li>
                    <li>Camiseta Codecon + Adesivos</li>
                    <li>Camiseta Codecon + Adesivos</li>
                    <li>Camiseta Codecon + Adesivos</li>
                    <li>Camiseta Codecon + Adesivos</li>
                </ol>
                <br></br>
                <p>
                    O ranking por padrão é desabilitado e será revelado no dia 23 de junho de 2023,
                    às 20h, horário de Brasília. Esta também é a data máxima para resgate. Os{' '}
                    <strong>ganhadores serão divulgados nas nossas redes sociais</strong>. Caso haja
                    empate, os critérios de desempate serão: quem mais fez resgates; quem fez o
                    primeiro resgate antes e sorteio. Nessa ordem.
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
