import Link from 'next/link';

import Header from '@components/_ui/Header';
import Page from '@components/_ui/Page';
import Form from '@components/missao/Form';
import PrivateArea from '@components/_ui/PrivateArea/PrivateArea';

export default function MissionBoard() {
    const meta = {
        title: 'Quadro de missões - Codecon Digital'
    };

    return (
        <Page theme="digital" meta={meta} hideNav hideFooter>
            <Header title="Quadro de Missões" layoutText />
            <div className="container container-text">
                <p>
                    Bem-vindos, aventureiros, a uma emocionante jornada em busca de um tesouro
                    lendário em Deployr! Preparem-se para decifrar nove pistas, que os guiarão por
                    todos os cantos da cidade mágica. Segurem suas espadas, invoquem sua sabedoria e
                    que a busca comece!
                </p>
                <p>
                    Anote as palavras chave que aparecem em cada pista, somente com elas é possível
                    desbloquear o tesouro. Depois de encontrar todas as palavras, volte até aqui e
                    adicione elas na ordem correta no formulário.
                </p>
                <p>E aqui está a primeira pista:</p>
                <p>
                    "O ponto de partida está onde a magia flui livremente, onde portais mágicos se
                    entrelaçam. Dirijam-se à fonte de poder que reflete a majestade do céu
                    estrelado."
                </p>
                <p>
                    Todos que conseguirem preencher ganham pontos no Code-codes e também estão
                    concorrendo a uma premiação!{' '}
                    <span className="destaque">
                        Uma Sling Bag Pixoo da Divoom (dá um Google aí)
                    </span>
                    .
                </p>
                <br />
                <h3>Já encontrou tudo? Que bom, informe todas as palavras abaixo:</h3>
                <p>Não esqueça dos acentos.</p>
                <PrivateArea>
                    <Form />
                </PrivateArea>
            </div>
        </Page>
    );
}
