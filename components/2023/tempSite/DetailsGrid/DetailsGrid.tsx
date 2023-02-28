import Image from 'next/image';
import cn from 'classnames';

import styles from './DetailsGrid.module.scss';

export default function DetailsGrid() {
    return (
        <section>
            <div className={cn('container', styles.grid)}>
                <a
                    href="https://www.sympla.com.br/evento-online/codecon-digital-2023/1829527"
                    target="_blank"
                    rel="noreferrer noopener"
                    className={cn(styles.block, styles.digital)}
                >
                    <Image src="/images/2023/codecon-digital.svg" width={192} height={27} />
                    <p>
                        <strong>22 e 23 de junho de 2023</strong>
                        <br />
                        Numa cidade medieval no Gather.
                    </p>
                    <p>Ingressos disponíveis.</p>
                </a>
                <a
                    href="https://tally.so/r/w8NDPA"
                    target="_blank"
                    rel="noreferrer noopener"
                    className={cn(styles.block, styles['papers-digital'])}
                >
                    Call4papers Codecon Digital
                </a>
                <a
                    href="https://www.sympla.com.br/evento/codecon-summit-2023/1829544"
                    target="_blank"
                    rel="noreferrer noopener"
                    className={cn(styles.block, styles.summit)}
                >
                    <Image src="/images/2023/codecon-summit.svg" width={215} height={22} />
                    <p>
                        <strong>25 e 26 de agosto de 2023</strong>
                        <br />
                        Presencial em Joinville, SC
                    </p>
                    <p>Ingressos early bird disponíveis.</p>
                </a>
                <a
                    href="https://tally.so/r/w8NDPA"
                    target="_blank"
                    rel="noreferrer noopener"
                    className={cn(styles.block, styles['papers-summit'])}
                >
                    Call4papers Codecon Summit
                </a>
                <a
                    href="https://www.sympla.com.br/evento/codecon-feature-2023/1829552"
                    target="_blank"
                    rel="noreferrer noopener"
                    className={cn(styles.block, styles.feature)}
                >
                    <Image src="/images/2023/codecon-feature.svg" width={213} height={22} />
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
                    <Image src="/images/2023/dvlpr.svg" width={87} height={21} />
                    <h3>Conheça a DVLPR</h3>
                    <p>Camisetas para pessoas desenvolvedoras com a qualidade Chico Rei.</p>
                </a>
                <a
                    href="https://codecon.substack.com"
                    target="_blank"
                    rel="noreferrer noopener"
                    className={cn(styles.block, styles.newsletter)}
                >
                    <Image src="/images/2023/feature-newsletter.svg" width={200} height={18} />
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
                <a
                    href="https://discord.gg/invite/Cz4zgUr"
                    target="_blank"
                    rel="noreferrer noopener"
                    className={cn(styles.block, styles.discord)}
                >
                    <Image src="/images/2023/discord.svg" width={145} height={29} />
                    <h3>Nossa comunidade</h3>
                    <p>Faça parte de nossa comunidade no Discord e receba tudo em primeira mão.</p>
                </a>
                <a
                    href="https://codecon.dev/2022"
                    target="_blank"
                    rel="noreferrer noopener"
                    className={cn(styles.block, styles.antigo)}
                >
                    <h3>Codecon 2022</h3>
                    <p>Confira o site do nosso último evento.</p>
                </a>
            </div>
        </section>
    );
}
