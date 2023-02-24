import Image from 'next/image';
import PuzzleLayout from '../PuzzleLayout';
import styles from './DayThreePuzzle22.module.scss';

export default function DayThreePuzzle22() {
    return (
        <PuzzleLayout bgStyle={styles.bg}>
            <div className={styles.content}>
                <p>
                    Um movimentado agente que pode confundir quanto à sua concretude num primeiro
                    momento. As máquinas os executavam, de modo ou outro, desde o início do 101.
                </p>
                <audio controls>
                    <source src="/audio/enigmas/22.mp3" type="audio/mpeg" />
                </audio>
            </div>
        </PuzzleLayout>
    );
}
