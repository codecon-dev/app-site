import PuzzleLayout from '../PuzzleLayout';

export default function Puzzle() {
    return (
        <PuzzleLayout>
            <div style={{ position: 'relative' }}>
                <div
                    onClick={() => console.log('implementar funcionalidade de baixar a letra da música')}
                    style={{ position: 'absolute', top: '112px', right: '80px', height: '105px', width: '92px' }}
                ></div>
            <img src="/images/enigmas/globo/2.png" />
            </div>
        </PuzzleLayout>
    );
}
