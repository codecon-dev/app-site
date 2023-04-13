import { useState } from 'react';
import Image from 'next/image';

import PuzzleLayout from '../PuzzleLayout';
import styles from './DayThreePuzzle28.module.scss';

export default function DayThreePuzzle28() {
    const [showModal, setShowModal] = useState(false);

    return (
        <PuzzleLayout bgStyle={styles.bg}>
            {showModal && (
                <div onMouseOut={() => setShowModal(false)} className={styles.modal}>
                    <Image alt="" src="/images/enigmas/28-2.png" width={1208} height={441} />
                </div>
            )}
            <button className={styles.button} onMouseOver={() => setShowModal(true)} />
        </PuzzleLayout>
    );
}
