import styles from './DayOnePuzzle2.module.scss';
import PuzzleLayout from '../PuzzleLayout';
import Image from 'next/image';
import { useState } from 'react';

export default function DayOnePuzzle2() {
    const mugImage1 = '/images/enigmas/2-m.png';
    const mugImage2 = '/images/enigmas/2-m2.png';
    const [mugImage, setMugImage] = useState(mugImage1);

    function handleMouseOver() {
        setMugImage(mugImage2);
    }

    function handleMouseOut() {
        setMugImage(mugImage1);
    }

    return (
        <PuzzleLayout bgStyle={styles.bg}>
            <div className={styles.container}>
                <div className={styles.book}>
                    <Image alt="" src="/images/enigmas/2.png" width={744} height={467} />
                </div>
                <div className={styles.mug}>
                    <Image
                        alt=""
                        onMouseOver={handleMouseOver}
                        onMouseOut={handleMouseOut}
                        src={mugImage}
                        width={525}
                        height={360}
                    />
                </div>
            </div>
        </PuzzleLayout>
    );
}
