import PuzzleLayout from '../PuzzleLayout';
import styles from './DayTwoPuzzle20.module.scss';

export default function DayTwoPuzzle20() {
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
