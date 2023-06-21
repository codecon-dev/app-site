import PuzzleLayout from '../PuzzleLayout';

export default function Puzzle() {
    return (
        <PuzzleLayout bg="/images/enigmas/blip/1.png">
            <a href="https://itu.sp.gov.br/wp-content/uploads/2020/06/Mapa-Sede-08-04-2020.jpg">
                <audio controls>
                    <source src="/audio/enigmas/blip/1.wav" type="audio/wav" />
                </audio>
            </a>
        </PuzzleLayout>
    );
}
