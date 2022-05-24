import { SALES_ENABLED, SYMPLA_URL } from '@lib/constants';
import styles from './nobody.module.css';

export default function Nobody() {
  return (
    <>
      <div className={styles.background}>
        <div className={styles.wrapper}>
          <h3 className={styles.darkCity}>
            25 de setembro, <br className={styles['show-on-mobile']} />
            na Dark City
          </h3>

          {SALES_ENABLED && (
            <a
              className={styles.button}
              href={SYMPLA_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Inscreva-se // R$ 39
            </a>
          )}

          <h2 className={styles.title}>
            Ninguém aguenta mais <span>evento online</span>
          </h2>
          <p className={styles.text}>
            A gente sabe que você tá de saco cheio de assistir palestra pelo Zoom e morre de saudade
            do café grátis. Nós também. A má notícia é que não podemos acabar com a pandemia. A boa
            notícia é que a próxima edição da Codecon está chegando e vai ser diferente de tudo o
            que você já viu.
          </p>
        </div>
      </div>
    </>
  );
}
