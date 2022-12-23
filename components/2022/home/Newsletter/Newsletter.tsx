import Image from 'next/image';

import { Grid, Column } from '@components/2022/_ui/Grid';

import styles from './Newsletter.module.scss';
import LinkButton from '@components/2022/_ui/LinkButton';

export default function Newsletter() {
    return (
        <section>
            <Grid align="center">
                <Column lg={8} sm={9}>
                    <h2>Uma newsletter com curadoria de links para pessoas desenvolvedoras</h2>
                </Column>
                <Column lg={3} sm={1} xsm={0} />
                <Column lg={1} sm={2} xsm={0}>
                    <div className={styles['image__wrapper']}>
                        <Image src="/icons/2022/mail.svg" width={48} height={48} />
                    </div>
                </Column>
            </Grid>
            <Grid>
                <Column lg={6} sm={6}>
                    <p>
                        Toda semana eu, Gabriel Nunes, te envio uma coletânea com 7 links de
                        artigos, notícias, repositórios e tudo que há de bom. No final ainda temos
                        um bônus com memes e links divertidos.
                    </p>
                </Column>
                <Column lg={2} sm={0} xsm={0} />
                <Column lg={4} sm={6}>
                    <div className={styles['text-right']}>
                        <LinkButton href="https://codecon.substack.com/" newPage>
                            Clique e inscreva-se
                        </LinkButton>
                    </div>
                </Column>
            </Grid>
        </section>
    );
}
