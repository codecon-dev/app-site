/* eslint-disable @next/next/no-img-element */
import PuzzleLayout from '../PuzzleLayout';
import Modal from '../Modal/Modal';
import { useState } from 'react';

export default function Puzzle() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [hover, setHover] = useState(false);

    const message =
        '“felix the MSc smuggly laughs under his eyeglasses as he watches the teams battle for the ball – and well, the points for waving the net. The cat knows ‘em all as well as their numbers – the master, really, always does.”';

    return (
        <>
            <PuzzleLayout bg="/images/enigmas/globo/4-bg.jpg">
                <div onClick={() => setIsModalOpen(!isModalOpen)}>
                    <img
                        src={
                            hover ? '/images/enigmas/globo/4-h.jpg' : '/images/enigmas/globo/4.jpg'
                        }
                        onMouseOver={() => setHover(true)}
                        onMouseOut={() => setHover(false)}
                    />
                </div>
            </PuzzleLayout>
            <Modal
                message={message}
                isOpen={isModalOpen}
                bgColor="#2bd376"
                setIsOpen={() => setIsModalOpen(!isModalOpen)}
            />
        </>
    );
}
