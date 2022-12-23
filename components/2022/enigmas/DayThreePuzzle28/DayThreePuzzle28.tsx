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
                    <Image
                        src="/images/2022/enigmas/28-2.png"
                        width={1208}
                        height={441}
                        layout="responsive"
                    />
                </div>
            )}
            <button className={styles.button} onMouseOver={() => setShowModal(true)} />
        </PuzzleLayout>
    );
}