import PuzzleLayout from '../PuzzleLayout';

export default function Puzzle() {
    return (
        <PuzzleLayout bg="/images/enigmas/blip/10.png">
            <div style={{ marginTop: 'auto' }}>
                <audio controls>
                    <source src="/audio/enigmas/blip/10.mp3" type="audio/mp3" />
                </audio>
            </div>
        </PuzzleLayout>
    );
}
