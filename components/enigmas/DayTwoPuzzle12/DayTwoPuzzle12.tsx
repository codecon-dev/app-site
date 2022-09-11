import { useState } from 'react';
import Image from 'next/image';

import PuzzleLayout from '../PuzzleLayout';
import styles from './DayTwoPuzzle12.module.scss';

export default function DayTwoPuzzle12() {
    const [showModal, setShowModal] = useState(false);

    return (
        <PuzzleLayout bgStyle={styles.bg}>
            {showModal && (
                <div className={styles.modal} onClick={() => setShowModal(false)}>
                    <Image src="/images/enigmas/12-p.png" width={268} height={268} />
                </div>
            )}
            <div className={styles.image}>
                <button onClick={() => setShowModal(!showModal)} className={styles['button']} />
                <Image src="/images/enigmas/12.png" width={678} height={684} />
            </div>
        </PuzzleLayout>
    );
}
