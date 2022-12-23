import Image from 'next/image';
import Link from 'next/link';

import Page from '@components/_ui/Page';
import Layout from '@components/2022/_ui/Layout';

export default function ComoFunciona() {
    const meta = {
        title: 'Como funciona - Escape Room - Codecon Digital 2022'
    };

    return (
        <Page meta={meta}>
            <Layout hideNav hideFooter>
                <div className="container container-text">
                    <h2>Escape room Cogna</h2>
                    <h3>Como funciona</h3>
                    <p>
                        O seu objetivo nesse jogo é salvar a Matrix de um vírus que se espalhou nos
                        mainframes de Zion.
                    </p>
                    <p>
                        Este é um jogo em grupo, precisamos que você se junte entre 3 a 5 pessoas
                        para poder participar. Depois disso você consvesa com a pessoa da nossa
                        equipe que estará disponível e monitorando a fila.
                    </p>
                    <p>
                        São várias salas e em cada uma delas você deverá descobrir como sair,
                        explore o ambiente e siga as dicas para ser bem sucedido! Poderá participar
                        uma equipe por vez e elas terão 20 minutos para concluir. Caso o tempo seja
                        ultrapassado, alguém de nossa equipe entrará na sala para avisá-los.
                    </p>
                    <p>
                        Caso você não queira mais continuar e quiser sair, pode entrar no portal de
                        desistência, encontrado em todas as salas. Ao finalizar, você encontrará uma
                        personagem que te dirá "Vocês conseguiram!". É só interagir com ela
                        apertando a tecla `X` e seguir as instruções para resgatar seus códigos do
                        Code-codes.
                    </p>
                    <p>
                        Todos que finalizarem a Escape Room irão participar de um sorteio ao final
                        do evento, e também recebem 1.353 pontos no Code-codes. Por isso a
                        importância de preencher o formulário na última sala, não esqueça!
                    </p>
                    <p>
                        A premiação da Escape Room será, tudo através de sorteio para os que
                        finalizarem e preencherem o formulário:
                    </p>
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
                        Cada pessoa pode finalizar apenas uma vez a Escape Room. Mas, você pode
                        participar em quantos grupos quiser, se não conseguir finalizar antes.
                    </p>
                    <p>
                        As participações poderão acontecer até dia 24 de setembro de 2022, às 18h,
                        horário de Brasília.
                    </p>
                    <p>
                        As premiações são válidas para participantes que moram no Brasil e o frete é
                        por nossa conta. Entraremos em contato com os ganhadores por e-mail até 1
                        semana depois do evento para combinar a entrega da premiação.
                    </p>
                </div>
            </Layout>
        </Page>
    );
}
