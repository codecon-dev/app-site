import styles from './puzzles.module.css';

export default function PuzzlesRightAnswer({ msg }: { msg: string }) {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Você acertou!</h2>
      <p>{msg}</p>
    </div>
  );
}
