import { useEffect, useState } from 'react';
import PuzzleLayout from '../PuzzleLayout';

export default function Puzzle() {
    const [currentVideo, setCurrentVideo] = useState(1);

    useEffect(() => {
        const videoTimeout = setTimeout(
            () => {
                setCurrentVideo(prevVideo => (prevVideo === 1 ? 2 : 1));
            },
            currentVideo === 1 ? 10000 : 14000
        );

        return () => clearTimeout(videoTimeout);
    }, [currentVideo]);

    return (
        <PuzzleLayout>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <iframe
                    width="640"
                    height="360"
                    src={`https://www.youtube.com/embed/${
                        currentVideo === 1 ? 'BMS4PWSxj5E' : 'HPuZh0gKibg'
                    }?autoplay=1&controls=0`}
                    title='Roupa Nova - Abertura e Encerramento da novela "A Viagem" (1994)'
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                ></iframe>
                <img src="/images/enigmas/globo/9.png" />
            </div>
        </PuzzleLayout>
    );
}
