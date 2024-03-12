import { useState } from 'react';
import PuzzleLayout from '../PuzzleLayout';
import Modal from '../Modal/Modal';

export default function Puzzle() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <PuzzleLayout>
                <div style={{ letterSpacing: '3rem', fontWeight: 700, fontSize: '100px' }}>
                    <span>TE</span>
                    <span style={{ color: '#2BD376' }}>_</span>
                    <span>A</span>
                </div>
                <p
                    style={{ cursor: 'pointer', color: '#1E252F', marginTop: 120 }}
                    onClick={() => setIsModalOpen(true)}
                >
                    click to unlock
                </p>
            </PuzzleLayout>
            <Modal
                isOpen={isModalOpen}
                setIsOpen={() => setIsModalOpen(!isModalOpen)}
                bgColor="#2bd376"
                message={
                    'De diversos tipos, é uma TRAMA feita de muitos elementos muito menores que o todo, cujo conjunto faz ampla diferença. Sua função é conter, seja uma refeição, diferentes pontos de uma rede ou a sua atenção para fatos do dia a dia/novelas/esportes.'
                }
            />
        </>
    );
}
