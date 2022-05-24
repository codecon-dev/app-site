import cn from 'classnames';
import styles from './events.module.css';

export default function Events() {
  return (
    <div className={styles.wrapper}>
      <section className={styles.container}>
        <img src="/events/abril.png" />
        <div>
          <h2 className={styles.title}>30 de abril</h2>
          <h3 className={styles.subtitle}>Dark City, online no Gather Town</h3>

          <p className={styles.text}>
            Um dia de evento com palestras e workshops sobre programação, caça aos códigos, prêmios
            e muito networking.
          </p>
        </div>
      </section>
      <section className={styles.container}>
        <img src="/events/setembro.png" />
        <div>
          <h2 className={cn(styles.title, styles.green)}>22 a 24 de setembro</h2>
          <h3 className={cn(styles.subtitle, styles.green)}>Z-City, online no Gather Town</h3>

          <p className={styles.text}>
            Festival com 3 dias de duração, palestras, workshops, maratona de programação, resolução
            de enigmas, caça aos códigos, gamificação e, obviamente, muito networking.
          </p>
        </div>
      </section>
    </div>
  );
}
