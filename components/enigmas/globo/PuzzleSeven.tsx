import PuzzleLayout from '../PuzzleLayout';

export default function Puzzle() {
    return (
        <PuzzleLayout>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div>
                    <img src="/images/enigmas/globo/7.png" />
                </div>
                <div
                    className="text-center"
                    style={{ margin: '2rem 12rem 1rem', fontSize: '20px', lineHeight: '200%' }}
                >
                    Ele aperta dependendo da situação econômica. Elemento fashion, deu muito o que
                    falar no famoso discurso de _______ ________ sobre determinada cor do círculo
                    cromático. Se trocada uma letra, pode passar um sentimento.
                </div>
            </div>
        </PuzzleLayout>
    );
}
