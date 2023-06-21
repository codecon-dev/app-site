import { useState } from 'react';
import PuzzleLayout from '../PuzzleLayout';
import Modal from '../Modal/Modal';

export default function Puzzle() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [msg, setMsg] = useState('');

    return (
        <>
            <PuzzleLayout bg="/images/enigmas/globo/16.jpg">
                <p>
                    Sólido constituído por seu externo e sua parte interna, formada por sua
                    superfície, fuso e cunha, e obtida a partir da rotação de um semicírculo em
                    torno de seu eixo.{' '}
                </p>
                <div
                    onClick={() => {
                        setMsg('');
                        setIsModalOpen(!isModalOpen);
                    }}
                    style={{
                        position: 'absolute',
                        bottom: '0',
                        left: '0%',
                        height: '28vh',
                        width: '30vh',
                        cursor: 'pointer'
                    }}
                ></div>
                <div
                    onClick={() => {
                        setMsg('A = 4πr²');
                        setIsModalOpen(!isModalOpen);
                    }}
                    style={{
                        position: 'absolute',
                        top: '12%',
                        left: '35%',
                        height: '29vh',
                        width: '29vh',
                        cursor: 'pointer'
                    }}
                ></div>
                <div
                    onClick={() => {
                        setMsg('= (4πr³ / 3)');
                        setIsModalOpen(!isModalOpen);
                    }}
                    style={{
                        position: 'absolute',
                        top: '40%',
                        right: '0%',
                        height: '42vh',
                        width: '43vh',
                        cursor: 'pointer'
                    }}
                ></div>
            </PuzzleLayout>
            <Modal
                message={msg}
                isOpen={isModalOpen}
                setIsOpen={() => setIsModalOpen(!isModalOpen)}
            />
        </>
    );
}
