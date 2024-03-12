/* eslint-disable @next/next/no-img-element */
import PuzzleLayout from '../PuzzleLayout';

export default function Puzzle() {
    return (
        <PuzzleLayout>
            <video width="570" height="320" controls autoPlay loop>
                <source src="/video/enigmas/globo/9.mp4" type="video/mp4" />
            </video>
            <img src="/images/enigmas/globo/9.png" />
        </PuzzleLayout>
    );
}
