import { useState } from 'react';
import Image from 'next/image';

import PuzzleLayout from '../PuzzleLayout';
import styles from './DayThreePuzzle29.module.scss';

export default function DayOnePuzzle30() {
    const [showModal, setShowModal] = useState(false);

    return (
        <PuzzleLayout bgStyle={styles.bg}>
            {showModal && (
                <div className={styles.modal}>
                    <Image src="/images/enigmas/29-2.png" width={90} height={90} />
                    <h3>Modo de usar</h3>
                    <p>
                        Preferência para contextos de programação orientada. Destinada a proteger
                        determinadas funcionalidades para boa execução de instruções em unidades
                        menores e individualizadas de algoritmo.
                    </p>
                    <h3>Indicações</h3>
                    <p>
                        capacita modificações mais cirúrgicas e pontuais, sem que partes de uma
                        única funcionalidade estejam contidas em diversas partes do sistema.
                    </p>
                </div>
            )}
            <a onClick={() => setShowModal(true)} className={styles.link}>
                &nbsp;
            </a>
        </PuzzleLayout>
    );
}
