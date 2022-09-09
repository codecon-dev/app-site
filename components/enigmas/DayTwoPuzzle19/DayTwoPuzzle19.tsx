import Image from 'next/image';
import PuzzleLayout from '../PuzzleLayout';
import styles from './DayTwoPuzzle19.module.scss';

export default function DayTwoPuzzle19() {
    return (
        <PuzzleLayout bgStyle={styles.bg}>
            <Image src="/images/enigmas/19.png" width={1440} height={805} />
        </PuzzleLayout>
    );
}
