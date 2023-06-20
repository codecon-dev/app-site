import PuzzleLayout from '../PuzzleLayout';

export default function Puzzle() {
    return (
        <PuzzleLayout bgContent="/images/enigmas/totvs/11-bg.png">
            <div style={{ display: 'flex', gap: '2rem' }}>
                <img src="/images/enigmas/totvs/13-1.png" />
                <img src="/images/enigmas/totvs/13-2.png" />
            </div>
        </PuzzleLayout>
    );
}
