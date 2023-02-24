import Image from 'next/image';

import styles from './About.module.scss';
import { Grid, Column } from '@components/_ui/Grid';

export default function About() {
    const blurDataUrl =
        'data:image/png;base64,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';

    return (
        <section className={styles.section}>
            <Grid className={styles.grid}>
                <Column lg={6} sm={6}>
                    <div className={styles['image__wrapper']}>
                        <Image
                            src="/images/developer.png"
                            width={594}
                            height={544}
                            alt="Programador usando um notebook"
                            quality={100}
                            placeholder="blur"
                            blurDataURL={blurDataUrl}
                        />
                        <div className={styles['image__badge']}>
                            <Image
                                src="/images/patrocinadores/badge.svg"
                                width={238}
                                height={238}
                                alt="Texto escrito workshops, painéis e palestras"
                                quality={100}
                            />
                        </div>
                    </div>
                </Column>
                <Column lg={1} sm={0} xsm={0} />
                <Column lg={5} sm={6} xsmOrder={1}>
                    <p>
                        A Codecon reúne código, diversão e atividades em um ambiente virtual onde
                        você consegue <strong>de verdade</strong> interagir com outras pessoas.
                    </p>
                    <div className={styles['image__illustration']}>
                        <Image
                            src="/images/gather.png"
                            width={479}
                            height={218}
                            quality={100}
                        />
                    </div>
                </Column>
            </Grid>
        </section>
    );
}
