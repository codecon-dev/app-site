import { useState } from 'react';
import PuzzleLayout from '../PuzzleLayout';

export default function Puzzle() {
    const [click, setClick] = useState(false);

    return (
        <PuzzleLayout>
            <div
                style={{
                    backgroundImage: 'url("/images/enigmas/globo/12.png")',
                    backgroundSize: '100% auto',
                    backgroundPosition: 'center',
                    position: 'fixed',
                    width: '100%',
                    height: '100%',
                    top: 0,
                    left: 0,
                    zIndex: 0,
                    transition: 'all 8s ease',
                    transform: click ? 'scale(1)' : 'scale(8)'
                }}
                onClick={() => setClick(true)}
            />
        </PuzzleLayout>
    );
}
