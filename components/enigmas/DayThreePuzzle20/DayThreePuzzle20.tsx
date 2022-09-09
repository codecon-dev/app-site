import PuzzleLayout from '../PuzzleLayout';
import styles from './DayThreePuzzle20.module.scss';

export default function DayThreePuzzle20() {
    return (
        <PuzzleLayout>
            <div className={styles.content}>
                <audio controls>
                    <source src="/audio/enigmas/20.mp3" type="audio/mpeg" />
                </audio>
            </div>
        </PuzzleLayout>
    );
}
