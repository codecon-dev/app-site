import styles from './DayOnePuzzle1.module.scss';
import PuzzleLayout from '../PuzzleLayout';

export default function DayOnePuzzle1() {
  return (
    <PuzzleLayout bgStyle={styles.bg}>
      <div className={styles.text}>
        <p>
          Eu imagino que deva estar se sentindo um pouco como Alice, escorregando pela toca do coelho. Vejo isso em seus olhos...
        </p>
      </div>
    </PuzzleLayout>
  );
}
