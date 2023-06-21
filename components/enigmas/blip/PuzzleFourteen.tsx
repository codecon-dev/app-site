import PuzzleLayout from '../PuzzleLayout';

export default function Puzzle() {
    return (
        <PuzzleLayout bg="#000">
            <p style={{ fontFamily: 'Times New Roman', fontStyle: 'italic' }}>
                Nos últimos anos tem sido cada vez mais frequente, no noticiário e em outras fontes
                de informação, a citação de palavras que se referem aos três regimes de cumprimento
                de punições de prisão – o fechado, o semiaberto e o aberto. Segundo o Código Penal
                brasileiro, quanto mais grave é o crime cometido, mais rigoroso é o tratamento
                dispensado ao réu. As de caligrafia precisam ser limpas após cada uso, por isso,
                existem maneiras corretas de utilizar essas canetas.
            </p>
            <p style={{ fontFamily: 'Times New Roman', fontStyle: 'italic' }}>
                Por ser um produto extremamente frágil, principalmente sua ponta, ela se adapta aos
                traços do usuário, considerando flexão de mão, posição e força aplicada no papel. E
                não é preciso procurar muito para encontrar alguém que esteja passando por um
                momento de sofrimento. Quanto mais próximo, maior a nossa tendência em senti-la e
                sofrer junto com a{' '}
                <span
                    style={{
                        backgroundImage: 'url("/images/enigmas/blip/14.png")',
                        backgroundSize: '100% auto',
                        width: 99,
                        height: 36,
                        display: 'inline-block',
                        transform: 'translateY(12px)'
                    }}
                ></span>{' '}
                criatura.
            </p>
        </PuzzleLayout>
    );
}
