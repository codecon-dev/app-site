import styles from './HeroIa.module.scss';

export default function HeroIa() {
    return (
        <section>
            <div className="container">
                <span className={styles.highlight}>Conheça o Senior-GPT</span>
                <h1 className={styles.title}>
                    A primeira <span>IA brasileira</span> focada em pessoas dev
                </h1>
                <h2 className={styles.subtitle}>
                    A Senior-GPT é um modelo treinado com milhões de comentários e análises de
                    código feitos por profissionais sênior. Nossa inteligência artificial é capaz de
                    trazer um precisão incrível nas respostas e ajudar profissionais em todos os
                    níveis a aumentarem sua produtividade em até 300%.
                </h2>
            </div>
        </section>
    );
}
