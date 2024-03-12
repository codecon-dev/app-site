/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from 'react';
import PuzzleLayout from '../PuzzleLayout';

export default function Puzzle() {
    const images = ['18-1', '18-2'];

    const [currentImgIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex(prevIndex => (prevIndex + 1) % images.length);
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, [images.length]);

    return (
        <PuzzleLayout>
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr auto 1fr',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    fontWeight: 700,
                    fontSize: '80px',
                    width: '100%'
                }}
            >
                <div>
                    <span style={{ color: `${currentImgIndex === 0 ? '#2BD376' : '#fff'}` }}>
                        WHIT
                    </span>
                    <span>/</span>
                    <span style={{ color: `${currentImgIndex !== 0 ? '#2BD376' : '#fff'}` }}>
                        WITH
                    </span>
                </div>
                <div style={{ color: '#2BD376', fontSize: '200px' }}>+</div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <img src={`/images/enigmas/globo/${images[currentImgIndex]}.png`} />
                </div>
            </div>
        </PuzzleLayout>
    );
}
