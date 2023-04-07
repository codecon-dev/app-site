import { useState } from 'react';
import Image from 'next/image';

import PuzzleLayout from '../PuzzleLayout';
import styles from './DayThreePuzzle30.module.scss';

export default function DayThreePuzzle30() {
    let timer: ReturnType<typeof setTimeout>;
    const [bgStyle, setBgStyle] = useState('');

    function handleMouseOver() {
        timer = setTimeout(() => {
            setBgStyle(styles.bg);
        }, 2000);
    }

    function handleMouseOut() {
        setBgStyle('');
        clearTimeout(timer);
    }

    return (
        <PuzzleLayout bgStyle={bgStyle}>
            <div className={styles.text}>
                <p>usual way on a</p>
                <Image
                    alt=""
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}
                    src="/images/enigmas/30.png"
                    width={472}
                    height={116}
                />
                <p>to where the bunny brings 101 in</p>
            </div>
        </PuzzleLayout>
    );
}
