import Marquee from 'react-double-marquee';
import cn from 'classnames';
import styleUtils from '../utils.module.css';
import styles from './testimony.module.css';

export default function Testimony() {
  return (
    <div className={styles.wrapper}>
        <div className={styles.visible}>
            <div className={cn(
                styleUtils.appear,
                styleUtils['appear-sixth'],
                styles.container
            )}>
            
                <Marquee direction='left' speed={0.2}>
                    "De todos os eventos online que participei, o melhor é esse" "Eu gostei muito do conceito da Codecon e sinto que vocês entregaram uma experiência online imersiva que é o mais perto de um evento físico que eu já vi"

                </Marquee>

            </div>
        </div>
    </div>
  );
}
