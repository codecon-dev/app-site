import Image from 'next/image';
import { useState } from 'react';
import PuzzleLayout from '../PuzzleLayout';
import styles from './DayThreePuzzle26.module.scss';

export default function DayThreePuzzle26() {
    const [modalContent, setModalContent] = useState('');

    return (
        <PuzzleLayout bgStyle={styles.bg}>
            {modalContent != '' && (
                <div className={styles.modal} onMouseOut={() => setModalContent('')}>
                    <Image src={modalContent} width={500} height={500} />
                </div>
            )}
            <div className={styles.content}>
                <p>SCUTUM FIDEI, the 303.</p>
                <div className={styles.image}>
                    <button
                        onMouseOver={() => setModalContent('/images/2022/enigmas/26-a.png')}
                        className={styles['button-1']}
                    />
                    <button
                        onMouseOver={() => setModalContent('/images/2022/enigmas/26-b.png')}
                        className={styles['button-2']}
                    />
                    <button
                        onMouseOver={() => setModalContent('/images/2022/enigmas/26-c.png')}
                        className={styles['button-3']}
                    />
                    <Image src="/images/2022/enigmas/26.png" width={715} height={666} />
                </div>
                <p>SCUTUM FIDEI, the 303.</p>
            </div>
        </PuzzleLayout>
    );
}
