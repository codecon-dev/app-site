import Image from 'next/image';

import PuzzleLayout from '../PuzzleLayout';
import styles from './DayOnePuzzle8.module.scss';

export default function DayOnePuzzle8() {
    return (
        <PuzzleLayout bgStyle={styles.bg}>
            <Image alt="" src="/images/enigmas/8.png" width={834} height={532} quality={100} />
        </PuzzleLayout>
    );
}
