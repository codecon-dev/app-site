import cn from 'classnames';
import styleUtils from '../utils.module.css';
import styles from './fun.module.css';

export default function Fun() {
  return (
    <div className={styles.wrapper}>
        <div className={cn(
            styleUtils.appear,
            styleUtils['appear-sixth'],
            styles.container
        )}>
        
            <div className={styles.cont}>
                <h2>A diversão fica por conta do nosso "bot" no Discord</h2>
            </div>

            <div className={styles.cont}>
                <ul className={styles.list}>
                    <li>seja o primeiro a descobrir os enigmas e ganhe prêmios</li>
                    <li>sorteios dos patrocinadores</li>
                    <li>charadas</li>
                    <li>converse com os palestrantes e patrocinadores</li>
                </ul>
            </div>
            

        </div>
    </div>
  );
}
