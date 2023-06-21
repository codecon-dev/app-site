import { useState } from 'react';
import PuzzleLayout from '../PuzzleLayout';
import Modal from '../Modal/Modal';

export default function Puzzle() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <PuzzleLayout bg="/images/enigmas/globo/11.jpg">
                <div>
                    <div
                        onClick={() => {
                            setIsModalOpen(!isModalOpen);
                        }}
                        style={{
                            position: 'absolute',
                            top: '38%',
                            left: '54%',
                            height: '31vh',
                            width: '24vh'
                        }}
                    ></div>
                    <div
                        onClick={() => {
                            setIsModalOpen(!isModalOpen);
                        }}
                        style={{
                            position: 'absolute',
                            top: '41%',
                            left: '25%',
                            height: '29vh',
                            width: '19vh'
                        }}
                    ></div>
                    <div
                        onClick={() => {
                            setIsModalOpen(!isModalOpen);
                        }}
                        style={{
                            position: 'absolute',
                            top: '31%',
                            left: '40.5%',
                            height: '14vh',
                            width: '10vh'
                        }}
                    ></div>
                </div>
            </PuzzleLayout>
            <Modal
                isOpen={isModalOpen}
                setIsOpen={() => setIsModalOpen(!isModalOpen)}
                bgColor="#2bd376"
                message={
                    '“O de 88 RA é pioneiro, seguido pela pulpectomia e então por aquele de Chateaubriand no Brasil dos 50s”'
                }
            />
        </>
    );
}
