import Image from 'next/image';
import { useState } from 'react';

import PuzzleLayout from '../PuzzleLayout';
import styles from './DayThreePuzzle23.module.scss';

export default function DayThreePuzzle23() {
    const [imageSrc, setImageSrc] = useState('/images/enigmas/23.png');

    return (
        <PuzzleLayout>
            <div className={styles.image}>
                <button
                    className={styles['button-1']}
                    onMouseOver={() => setImageSrc('/images/enigmas/23-p.png')}
                    onMouseOut={() => setImageSrc('/images/enigmas/23.png')}
                />
                <button
                    className={styles['button-2']}
                    onMouseOver={() => setImageSrc('/images/enigmas/23-15.png')}
                    onMouseOut={() => setImageSrc('/images/enigmas/23.png')}
                />
                <Image alt="" src={imageSrc} width={945} height={672} quality={100} />
            </div>
        </PuzzleLayout>
    );
}
