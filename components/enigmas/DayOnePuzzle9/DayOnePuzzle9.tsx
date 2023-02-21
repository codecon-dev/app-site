import Image from 'next/image';
import { useState } from 'react';
import PuzzleLayout from '../PuzzleLayout';
import styles from './DayOnePuzzle9.module.scss';

export default function DayOnePuzzle9() {
    const [showModal, setShowModal] = useState(false);
    const [showHover, setShowHover] = useState(false);

    return (
        <PuzzleLayout bgStyle={styles.bg}>
            {showModal && (
                <div className={styles.modal} onMouseOut={() => setShowModal(false)}>
                    <Image src="/images/2022/enigmas/9-z.png" width={637} height={545} />
                </div>
            )}
            <div className={styles.image}>
                <button onMouseOver={() => setShowHover(true)} className={styles['button-1']} />
                <button onClick={() => setShowModal(true)} className={styles['button-2']} />
                {showHover && (
                    <span className={styles.hover} onMouseOut={() => setShowHover(false)}>
                        <Image src="/images/2022/enigmas/9-h.png" width={98} height={152} />
                    </span>
                )}
                <Image src="/images/2022/enigmas/9.png" width={738} height={584} />
            </div>
        </PuzzleLayout>
    );
}
