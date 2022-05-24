import Reactions from '@components/reactions';
import styles from './dark-city.module.css';

export default function DarkCity() {
  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <div className={styles.wrapper}>
          <h4 className={styles.title}>
            Bem-vindo(a) <span>à Dark City</span>
          </h4>
        </div>
      </div>
      <div className={styles.main}>
        <div className={styles.wrapper}>
          <img src="/m-dark-city.png" alt="Prédios da Dark City" width="100%" />

          <p>
            Nosso metaverso é uma cidade digital, construída no Gather Town, onde temos prédios
            abertos para encontros, trocas de experiência e networking.
          </p>

          <p>
            Cada prédio da cidade será destinado a uma linguagem de programação. Possuímos, por
            exemplo, os prédios PHP, Go, Python, Ruby, Javascript, entre outros. A ideia é que os
            meetups, workshops e demais interações aconteçam no espaço relacionado ao conteúdo.
          </p>
        </div>
      </div>
      <div className={styles.footer}></div>
    </section>
  );
}
