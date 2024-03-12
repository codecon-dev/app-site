/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from 'react';
import PuzzleLayout from '../PuzzleLayout';
import Button from '@components/_ui/LinkButton/LinkButton';

export default function Puzzle() {
    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
        const buttonTimeout = setTimeout(() => {
            setShowButton(true);
        }, 100000);

        return () => clearTimeout(buttonTimeout);
    }, []);

    return (
        <PuzzleLayout>
            <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
                <span className="tooltip" data-content="HC">
                    <img src="/images/enigmas/blip/19-1.png" />
                </span>
                <img src="/images/enigmas/blip/19-arrow.png" />
                <span className="tooltip" data-content="TA">
                    <img src="/images/enigmas/blip/19-2.png" />
                </span>
                <img src="/images/enigmas/blip/19-arrow.png" />
                <span className="tooltip" data-content="8">
                    <img src="/images/enigmas/blip/19-3.png" />
                </span>
                <img src="/images/enigmas/blip/19-arrow.png" />
                <span className="tooltip" data-content="0">
                    <img src="/images/enigmas/blip/19-4.png" />
                </span>
                <img src="/images/enigmas/blip/19-arrow.png" />
                <span className="tooltip" data-content="& menos seta para cima">
                    <img src="/images/enigmas/blip/19-5.png" />
                </span>
            </div>
            {showButton && (
                <Button href="https://www.take.net/blog/chatbots/chatbot/" newPage>
                    <img src="/images/enigmas/blip/19-6.png" />
                </Button>
            )}
        </PuzzleLayout>
    );
}
