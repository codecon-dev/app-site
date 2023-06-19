import { toast } from 'react-hot-toast';
import PuzzleLayout from '../PuzzleLayout';
import Modal from '../Modal/Modal';
import { useState } from 'react';

export default function Puzzle() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const message =
        '“felix the MSc smuggly laughs under his eyeglasses as he watches the teams battle for the ball – and well, the points for waving the net. The cat knows ‘em all as well as their numbers – the master, really, always does.”';

    return (
        <PuzzleLayout bgContent="/images/enigmas/globo/4.jpg">
            <div
                onClick={() => setIsModalOpen(!isModalOpen)}
                style={{
                    position: 'absolute',
                    top: '32%',
                    left: '25%',
                    height: '15vh',
                    width: '15vh'
                }}
            ></div>
            <Modal
                message={message}
                isOpen={isModalOpen}
                bgColor="#2bd376"
                setIsOpen={() => setIsModalOpen(!isModalOpen)}
            />
        </PuzzleLayout>
    );
}
