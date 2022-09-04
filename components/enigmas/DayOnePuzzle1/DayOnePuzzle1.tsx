import styles from './DayOnePuzzle1.module.scss';
import PuzzleLayout from '../PuzzleLayout';

export default function DayOnePuzzle1() {
  return (
    <PuzzleLayout bgStyle={styles.bg}>
      <div className={styles.text}>
        <p>
          Eu i&nbsp;&nbsp;agino que deva est&nbsp;&nbsp;r se sen&nbsp;&nbsp;indo um pouco como Alice, esco&nbsp;&nbsp;regando pela toca do coelho. Vejo &nbsp;&nbsp;sso em seus olhos...
        </p>
      </div>
    </PuzzleLayout>
  );
}
