import cn from 'classnames';
import styleUtils from '../utils.module.css';
import styles from './call4papers.module.css';

export default function Call4Papers() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.cont}>
          <h2>Call4Papers</h2>
          <p>
            Quer compartilhar seu conhecimento com o mundo? Envie sua sugestão de palestra ou
            workshop.
          </p>
        </div>

        <div className={styles.cont}>
          <a
            href="https://tally.so/r/mOyDRw"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.button}
          >
            Submeta seu conteúdo
          </a>
        </div>
      </div>
    </div>
  );
}
