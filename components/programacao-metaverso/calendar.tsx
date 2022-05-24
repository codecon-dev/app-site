import styles from './calendar.module.css';

export default function Calendar() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <iframe src="https://calendar.google.com/calendar/u/0/embed?src=c_44shc0migemahujkqofmr4erfg@group.calendar.google.com&ctz=America/Sao_Paulo" />
      </div>
    </div>
  );
}
