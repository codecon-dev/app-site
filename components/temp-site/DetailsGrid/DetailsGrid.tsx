import Link from 'next/link';
import Image from 'next/image';
import cn from 'classnames';

import styles from './DetailsGrid.module.scss';
import IconLogo from '@components/_ui/Icons/icon-logo';

export default function DetailsGrid() {
    return (
        <section>
            <div className={cn('container', styles.grid)}>
                <Link href="/digital">
                    <a className={cn(styles.block, styles.digital)}>
                        <IconLogo theme="digital" width={192} />
                        <p>
                            <strong>22 e 23 de junho de 2023</strong>
                            <br />
                            Numa cidade medieval no Gather.
                        </p>
                        <p>Ingressos disponíveis.</p>
                    </a>
                </Link>
                <a
                    href="https://tally.so/r/w8NDPA"
                    target="_blank"
                    rel="noreferrer noopener"
                    className={cn(styles.block, styles['papers-digital'])}
                >
                    <h3>Call4papers Codecon Digital</h3>
                    <p>Envie sua sugestão de palestra.</p>
                </a>
                <a
                    href="https://www.sympla.com.br/evento/codecon-summit-2023/1829544"
                    target="_blank"
                    rel="noreferrer noopener"
                    className={cn(styles.block, styles.summit)}
                >
                    <IconLogo theme="summit" width={215} />
                    <p>
                        <strong>25 e 26 de agosto de 2023</strong>
                        <br />
                        Presencial em Joinville, SC
                    </p>
                    <p>Ingressos early bird disponíveis.</p>
                </a>
                <a
                    href="https://tally.so/r/w5X0GM"
                    target="_blank"
                    rel="noreferrer noopener"
                    className={cn(styles.block, styles['papers-summit'])}
                >
                    <h3>Call4papers Codecon Summit</h3>
                    <p>Envie sua sugestão de palestra.</p>
                </a>
                <a
                    href="https://www.sympla.com.br/evento/codecon-feature-2023/1829552"
                    target="_blank"
                    rel="noreferrer noopener"
                    className={cn(styles.block, styles.feature)}
                >
                    <IconLogo theme="feature" width={213} />
                    <p>
                        <strong>28 de outubro de 2023</strong>
                        <br />
                        Evento para profissionais sênior ou cargos superiores em Floripa, SC
                    </p>
                    <p>Ingressos early bird disponíveis.</p>
                </a>
                <a
                    href="https://www.umapenca.com/dvlpr/"
                    target="_blank"
                    rel="noreferrer noopener"
                    className={cn(styles.block, styles.dvlpr)}
                >
                    <Image src="/images/dvlpr.svg" width={87} height={21} />
                    <h3>Camisetas exclusivas</h3>
                    <p>Com a qualidade Chico Rei.</p>
                </a>
                <a
                    href="https://codecon.substack.com"
                    target="_blank"
                    rel="noreferrer noopener"
                    className={cn(styles.block, styles.newsletter)}
                >
                    <Image src="/images/code-weekly.png" width={200} height={27} />
                    <h3>Nossa newsletter</h3>
                    <p>A melhor e única curadoria de links e artigos que você vai precisar.</p>
                </a>
                <a
                    href="https://instagram.com/codecon.dev"
                    target="_blank"
                    rel="noreferrer noopener"
                    className={cn(styles.block, styles.instagram)}
                >
                    <h3>Siga no Instagram</h3>
                </a>
                <a
                    href="https://twitter.com/codecondev"
                    target="_blank"
                    rel="noreferrer noopener"
                    className={cn(styles.block, styles.twitter)}
                >
                    <h3>Siga no Twitter</h3>
                </a>
            </div>
        </section>
    );
}
