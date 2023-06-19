import { useState } from 'react';
import PuzzleLayout from '../PuzzleLayout';
import Modal from '../Modal/Modal';

export default function Puzzle() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [img, setImg] = useState('');

    return (
        <PuzzleLayout bgContent="/images/enigmas/globo/19.jpg">
            <div>
                <div
                    onClick={() => {
                        setImg('/images/enigmas/globo/19-3.png');
                        setIsModalOpen(!isModalOpen);
                    }}
                    style={{
                        position: 'absolute',
                        top: '68%',
                        left: '52%',
                        height: '5vh',
                        width: '5vh'
                    }}
                ></div>
                <div
                    onClick={() => {
                        setImg('/images/enigmas/globo/19-2.png');
                        setIsModalOpen(!isModalOpen);
                    }}
                    style={{
                        position: 'absolute',
                        top: '0%',
                        left: '40%',
                        height: '5vh',
                        width: '5vh'
                    }}
                ></div>
                <div
                    onClick={() => {
                        setImg('/images/enigmas/globo/19-1.png');
                        setIsModalOpen(!isModalOpen);
                    }}
                    style={{
                        position: 'absolute',
                        top: '29%',
                        left: '55%',
                        height: '5vh',
                        width: '5vh'
                    }}
                ></div>
            </div>
            <Modal img={img} isOpen={isModalOpen} setIsOpen={() => setIsModalOpen(!isModalOpen)} />
        </PuzzleLayout>
    );
}
