import cn from 'classnames';
import styleUtils from '../utils.module.css';
import styles from './workshops.module.css';

export default function Workshops() {
  return (
    <div className={styles.wrapper}>
        <div className={cn(
            styleUtils.appear,
            styleUtils['appear-sixth'],
            styles.container
        )}>
        
            <div className={styles.cont}>
                <h2>Workshops online para colocar a mão na massa e aprender na prática.</h2>

                <div className={styles.link}>
                    <a href="/workshops">programação de workshops</a>
                    R$ 29 cada inscrição
                </div>
            </div>

            <div className={styles.cont}>
                <h2>boteco do <a href="http://twitter.com/devscansados" target="_blank">@devscansados</a> após a última noite de evento, para você se divertir e conhecer novas pessoas.</h2>

                <div className={styles.link}>
                    <a href="/patrocinadores">conheça nossos patrocinadores e parceiros</a>
                </div>
            </div>
            

        </div>
    </div>
  );
}
