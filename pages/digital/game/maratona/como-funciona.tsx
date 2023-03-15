import Page from '@components/_ui/Page';
import LinkButton from '@components/_ui/LinkButton';

export default function ComoFunciona() {
    const meta = {
        title: 'Como funciona - Escape Room - Codecon Digital 2022'
    };

    return (
        <Page theme="digital" meta={meta} hideNav hideFooter>
            <div className="container container-text">
                <h2>Maratona Alura</h2>
                <h3>Como funciona</h3>
                <p>
                    A Maratona da Alura funcionará através da plataforma Colosseum. Você pode
                    acessar a Wiki da plataforma para saber como funciona.
                </p>
                <br />
                <LinkButton newPage href="https://codecon.colosseum.website/wiki/">
                    Acessar Colosseum Wiki
                </LinkButton>
                <br />
                <br />
                <p>
                    Serão 3 torneios, um para cada dia de evento. Você poderá ler mais detalhes
                    técnicos na Wiki. Mas terá um tempo para enviar sua IA e melhorá-la. Depois os
                    envios serão fechados e a competição irá escolher a melhor de todas. As IAs
                    precisam ser enviadas usando Python.
                </p>
                <p>
                    Para cada dia de torneio, serão elegidos os 3 primeiros colocados, que receberão
                    a seguinte premiação:
                </p>
                <br />
                <ol>
                    <li>Amazon Echo Dot + 3 meses de Alura</li>
                    <li>Camiseta Codecon + Adesivos</li>
                    <li>Ebook Casa do Código</li>
                </ol>
                <br />
                <p>
                    Os prêmios não são cumulativos, caso uma mesma pessoa ganhe em primeiro lugar
                    duas vezes, a segunda vez ela ficará com os prêmios do segundo lugar, e quem
                    ficou em segundo, pega os prêmios do primeiro, assim sucessivamente. Cada
                    participante, também ganhará pontos no Code-Codes, do primeiro ao décimo
                    colocado.
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
