/* eslint-disable @next/next/no-img-element */
import { useState } from 'react';
import PuzzleLayout from '../PuzzleLayout';

export default function Puzzle() {
    const [img, setImg] = useState('17');

    function handleClick() {
        if (img === '17') {
            setImg('17-2');
        }
        if (img === '17-2') {
            setImg('17-3');
        }
    }

    return (
        <PuzzleLayout>
            <div style={{ position: 'relative' }}>
                <img src={`/images/enigmas/globo/${img}.png`} />
                <div
                    onClick={handleClick}
                    style={{
                        position: 'absolute',
                        top: '25%',
                        left: '35%',
                        height: '5vh',
                        width: '5vh'
                    }}
                ></div>
            </div>
        </PuzzleLayout>
    );
}
