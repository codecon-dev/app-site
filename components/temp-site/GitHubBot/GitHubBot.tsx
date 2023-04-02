/* eslint-disable @next/next/no-img-element */
import styles from './GitHubBot.module.scss';

export default function GitHubBot() {
    return (
        <section>
            <div className="container">
                <span className={styles.highlight}>
                    <span>Em breve:</span> code review com inteligência artificial
                </span>
                <div className={styles.image}>
                    <img src="/images/ia/github.png" />
                </div>
                <h2 className={styles.subtitle}>
                    O nosso próximo passo é lançar um bot para GitHub, onde a nossa inteligência
                    artificial conseguirá fazer revisões de código, sugerir melhores práticas e te
                    avisar se você indentou algo errado.
                </h2>
            </div>
        </section>
    );
}
