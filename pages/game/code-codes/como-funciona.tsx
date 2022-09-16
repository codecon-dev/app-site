import { GetStaticProps } from 'next';
import Image from 'next/image';


import Page from '@components/_ui/Page';
import Layout from '@components/_ui/Layout';
import Header from '@components/_ui/Header';
import Rank from '@components/code-codes/Ranking';

export default function ComoFunciona() {
    const meta = {
        title: 'Como funciona Code-codes - Codecon Digital 2022',
    };

    return (
        <Page meta={meta}>
            <Layout hideNav hideFooter>
                <Header title="Code-codes" description="Como funciona" />
                    <div className='container'>
                    <p>
                        O code-codes é uma caça aos ✨ tokens secretos ✨. <br></br>
                        Durante nosso evento, você vai poder resgatar códigos que irão valer pontos em uma 
                        competição e os 10 primeiros colocados ganham prêmios incríveis.
                    </p>
                    <p>
                        Esse jogo foi criado para que você participe o máximo possível do evento. Por isso, os
                        tokens podem ser resgatados de várias formas: respondendo enigmas, tendo uma boa posição 
                        na maratona de programação, encontrando bugs espalhados pelo mapa, pegando códigos que 
                        os hosts divulgarem durante as apresentações, visitando estandes de patrocinadores entre 
                        outros. Toda atividade pode valer um código e quem sabe se você tiver sorte, pode até 
                        encontrar um bug dourado.
                    </p>
                    <p>
                        O resgate é feito em uma área específica do nosso mapa, onde você encontrará o
                        personagem <b>Pensador Profundo</b>. Nele, você poderá digitar o código obtido para resgatar seus
                        merecidos pontos. Algumas atividades contarão com um formato diferente, como os
                        Enigmas que possuem resgate automático e a Escape Room que possui uma sala especifica para resgate.
                    </p>
                    <p>
                        Para conseguir realizar o resgate dos seus pontos você deverá fazer login com o seu e-mail e cada 
                        resgate dará pontos específicos para cada código: alguns valem mais; outros, menos.

                        Os pontos serão contados para o{' '}
                        <a className="link" href="/game/code-codes">
                        ranking do code-codes
                        </a>
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
                        <li>Playstation 5</li>
                        <li>Mesa GenioDesk Plus</li>
                        <li>Teclado Logitech MX Keys Mini</li>
                        <li>Quarto prêmio</li>
                        <li>Quinto prêmio</li>
                        <li>Sexto prêmio</li>
                        <li>Sétimo prêmio</li>
                        <li>Oitavo prêmio</li>
                        <li>Nono prêmio</li>
                        <li>Décimo prêmio</li>
                    </ol>
                    <br></br>
                    <p>
                        As respostas serão aceitas até dia 24 de setembro de 2022, às 18h30m, horário de Brasília.
                        Às 17h do mesmo dia, o ranking será desabilitado e os <strong>ganhadores divulgados às 19:00h nas
                        nossas redes sociais</strong>. Caso haja empate, os critérios de desempate serão: quem mais fez
                        resgates; quem fez o primeiro resgate antes; sorteio, nessa ordem.
                    </p>
                    <p>
                        As premiações são válidas para participantes que moram no Brasil e o frete é por nossa
                        conta. Entraremos em contato com os ganhadores por e-mail até 1 semana depois do evento
                        para combinar a entrega da premiação.
                    </p>
                    <p>
                        Este jogo não aceita trapaças ou formas de tentar resgatar códigos burlando o sistema. A
                        organização tem o direito de remover os pontos que forem identificados como fraudulentos
                        ou até excluir o participante da competição.
                    </p>
                    <br></br> <br></br>
                    </div>
            </Layout>
        </Page>
    );
}

