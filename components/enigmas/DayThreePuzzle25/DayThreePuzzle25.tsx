import Image from 'next/image';
import PuzzleLayout from '../PuzzleLayout';
import styles from './DayThreePuzzle25.module.scss';

export default function DayThreePuzzle25() {
    return (
        <PuzzleLayout>
            <div className={styles.content}>
                <Image src="/images/2022/enigmas/25.png" width={576} height={226} />
                <br />
                <audio controls>
                    <source src="/audio/2022/enigmas/25.mp3" type="audio/mpeg" />
                </audio>
            </div>
        </PuzzleLayout>
    );
}
