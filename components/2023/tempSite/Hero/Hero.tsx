import cn from 'classnames';

import styles from './Hero.module.scss';

export default function Hero() {
    return (
        <section>
            <div className="container">
                <h1 className={styles.title}>
                    Eventos de tecnologia que fogem do <span>comum</span> teste
                </h1>
                <h2 className={styles.subtitle}>
                    Aqui a gente realmente acredita em criar eventos com experiências e conteúdos
                    que sejam verdadeiramente legais e transformadores. Acreditamos que uma boa
                    programação pode ajudar a reprogramar pessoas (pegou essa?).
                </h2>
            </div>
        </section>
    );
}
