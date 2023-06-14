import PuzzleLayout from '../PuzzleLayout';

export default function Puzzle() {
    return (
        <PuzzleLayout bgContent="/images/enigmas/totvs/14-bg.png">
            <img src="/images/enigmas/totvs/14.png" />
            <img src="/images/enigmas/totvs/14-2.png" style={{ position: 'absolute' }} />
        </PuzzleLayout>
    );
}
