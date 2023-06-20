import { useState } from 'react';
import PuzzleLayout from '../PuzzleLayout';
import { toast } from 'react-hot-toast';
import Modal from '../Modal/Modal';

export default function Puzzle() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toastMessage =
        'De diversos tipos, é uma TRAMA feita de muitos elementos muito menores que o todo, cujo conjunto faz ampla diferença. Sua função é conter, seja uma refeição, diferentes pontos de uma rede ou a sua atenção para fatos do dia a dia/novelas/esportes.';

    return (
        <PuzzleLayout>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ letterSpacing: '3rem', fontWeight: 700, fontSize: '100px' }}>
                    <span>TE</span>
                    <span style={{ color: '#2BD376', cursor: 'pointer' }}>_</span>
                    <span>A</span>
                </div>
                <div
                    className="text-center"
                    style={{
                        color: '#000000',
                        cursor: 'pointer',
                        fontSize: '35px',
                        lineHeight: '70px',
                        marginTop: '6rem'
                    }}
                    onClick={() => setIsModalOpen(true)}
                >
                    click to unlock
                </div>
            </div>
            <Modal
                isOpen={isModalOpen}
                setIsOpen={() => setIsModalOpen(!isModalOpen)}
                bgColor="#2bd376"
                message={
                    'De diversos tipos, é uma TRAMA feita de muitos elementos muito menores que o todo, cujo conjunto faz ampla diferença. Sua função é conter, seja uma refeição, diferentes pontos de uma rede ou a sua atenção para fatos do dia a dia/novelas/esportes.'
                }
            />
        </PuzzleLayout>
    );
}
