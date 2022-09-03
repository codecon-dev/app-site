import Form from '../Form';
import styles from './DayOnePuzzleOne.module.scss';
import NextImage from 'next/image';
import bg from './bg.png'

export default function DayOnePuzzleOne() {
  return (
    <section>
      <div className={styles.bg}>
        <NextImage src={bg} layout="fill"/>
      </div>
      <p className={styles.text}>
        Eu imagino que deva estar se sentindo um pouco como Alice, escorregando pela toca do coelho. Vejo isso em seus olhos...
      </p>
      <div className={styles.formContainer}>
        <Form />
      </div>
    </section>
  );
}
