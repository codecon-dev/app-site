import Image from 'next/image';
import PuzzleLayout from '../PuzzleLayout';
import styles from './DayThreePuzzle21.module.scss';

export default function DayThreePuzzle21() {
    return (
        <PuzzleLayout bgStyle={styles.bg}>
            <div className={styles.text}>
                <p>
                    “O grande oráculo de bigodes de Predátia adverte: atenção aos sinais. Não se
                    prenda às cores: o olho que se retrai à forte luz do conhecimento é o mesmo que
                    abraça a escuridão.”
                </p>
                <Image alt="" src="/images/enigmas/21-v.svg" width={49} height={44} />
            </div>
        </PuzzleLayout>
    );
}
