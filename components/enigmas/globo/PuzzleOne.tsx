import PuzzleLayout from '../PuzzleLayout';

export default function Puzzle() {
    return (
        <PuzzleLayout>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <img src="/images/enigmas/globo/1.png" />
                <div
                    className="text-center"
                    style={{ margin: '1rem 12rem', fontSize: '20px', lineHeight: '200%' }}
                >
                    Lugar onde se manipula um famoso brinquedo, cuja brincadeira já virou coisa
                    séria pelo menos desde Charles Miller. Lugar recém-conquistado por mulheres e
                    também símbolo de muita luta em termos de uma necessária (e frequentemente
                    ignorada) reforma.
                </div>
            </div>
        </PuzzleLayout>
    );
}
