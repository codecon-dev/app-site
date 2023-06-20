import PuzzleLayout from '../PuzzleLayout';

export default function Puzzle() {
    return (
        <PuzzleLayout>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div>
                    <img src="/images/enigmas/globo/8.jpg" />
                </div>
                <div
                    className="text-center"
                    style={{ margin: '2rem 12rem 1rem', fontSize: '20px', lineHeight: '200%' }}
                >
                    Sistema que manifesta a vontade de cada um e, em conjunto, traz efeito soberano
                    sobre o todo. Foi das primeiras cidades-estado aos realities em questão de
                    alguns séculos, globalmente falando. Uma denunciante perfeita é a famosa
                    expressão “foco no gshow!”
                </div>
            </div>
        </PuzzleLayout>
    );
}
