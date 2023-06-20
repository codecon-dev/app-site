import { useState } from 'react';
import PuzzleLayout from '../PuzzleLayout';
import Modal from '../Modal/Modal';

export default function Puzzle() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [msg, setMsg] = useState('');

    return (
        <PuzzleLayout bgContent="/images/enigmas/globo/16.jpg">
            <div
                onClick={() => {
                    setMsg('');
                    setIsModalOpen(!isModalOpen);
                }}
                style={{
                    position: 'absolute',
                    top: '44%',
                    left: '12%',
                    height: '28vh',
                    width: '30vh'
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
                    width: '29vh'
                }}
            ></div>
            <div
                onClick={() => {
                    setMsg('= (4πr³ / 3)');
                    setIsModalOpen(!isModalOpen);
                }}
                style={{
                    position: 'absolute',
                    top: '21%',
                    left: '58%',
                    height: '42vh',
                    width: '43vh'
                }}
            ></div>
            <Modal
                message={msg}
                isOpen={isModalOpen}
                setIsOpen={() => setIsModalOpen(!isModalOpen)}
            />
        </PuzzleLayout>
    );
}
