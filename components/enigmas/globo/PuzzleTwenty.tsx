import { useEffect } from 'react';
import PuzzleLayout from '../PuzzleLayout';

export default function Puzzle() {
    return (
        <PuzzleLayout bg="/images/enigmas/globo/20.jpg">
            <a
                style={{ width: '50%', height: '70%' }}
                href="/images/enigmas/globo/banner-roberto-carlos.jpg"
                download
            ></a>
        </PuzzleLayout>
    );
}
