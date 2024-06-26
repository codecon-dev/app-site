import Image from 'next/image';
import cn from 'classnames';

import { Grid, Column } from '@components/_ui/Grid';
import styles from './Differentials.module.scss';

export default function Differentials() {
    return (
        <section>
            <Grid>
                <Column lg={4}>
                    <div className={styles.content}>
                        <span className={styles.image}>
                            <Image
                                src="/icons/libras.png"
                                width={64}
                                height={64}
                                alt="Emoji de pessoa fazendo sinal em Libras"
                                quality={100}
                            />
                        </span>
                        <p>
                            <strong>Evento acessível!</strong> As palestras em português terão
                            intérpretes de Libras.
                        </p>
                    </div>
                </Column>
                <Column lg={4}>
                    <div className={styles.content}>
                        <span className={styles.image}>
                            <Image
                                src="/icons/certificado.png"
                                width={64}
                                height={64}
                                alt="Emoji de pergaminho"
                                quality={100}
                            />
                        </span>
                        <p>
                            Após o evento enviaremos certificado de participação de 10 horas para
                            você.
                        </p>
                    </div>
                </Column>
                <Column lg={4}>
                    <div className={cn(styles.content, styles.last)}>
                        <span className={styles.image}>
                            <Image
                                src="/icons/pesquisa.png"
                                width={64}
                                height={64}
                                alt="Emoji de lupa"
                                quality={100}
                            />
                        </span>
                        <p>
                            Realizamos uma pesquisa para mapear o mercado de tecnologia no Brasil,{' '}
                            <a
                                href="https://pesquisa.codecon.dev"
                                target="_blank"
                                rel="noreferrer noopener"
                            >
                                confira os resultados.
                            </a>
                        </p>
                    </div>
                </Column>
            </Grid>
        </section>
    );
}
