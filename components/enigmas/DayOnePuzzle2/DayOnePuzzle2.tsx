import styles from './DayOnePuzzle2.module.scss';
import PuzzleLayout from '../PuzzleLayout';
import Image from 'next/image';

export default function DayOnePuzzle2() {
  return (
    <PuzzleLayout bgStyle={styles.bg}>
      <div className={styles.glasses}>
        <Image src="/images/enigmas/2-glasses.png" layout='fill'/>
      </div>
    </PuzzleLayout>
  );
}
