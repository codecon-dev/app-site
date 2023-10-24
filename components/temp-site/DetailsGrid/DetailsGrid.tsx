import Link from 'next/link';
import Image from 'next/image';
import cn from 'classnames';

import styles from './DetailsGrid.module.scss';
import IconLogo from '@components/_ui/Icons/icon-logo';

export default function DetailsGrid() {
    return (
        <section>
            <div className={cn('container', styles.grid)}>
             
                <span className={cn(styles.block, styles.summit, styles.static)}>
                    <IconLogo theme="summit" width={215} />
                    <p>
                        SAVE THE DATE<br/>
                        <strong>06 e 07 de setembro de 2024</strong>
                        <br />
                        Complexo Expoville
                    </p>
                    <img src="/images/summit/realizacao.svg" width={400} />
                </span>

                <a
                    href="https://www.umapenca.com/dvlpr/"
                    target="_blank"
                    rel="noreferrer noopener"
                    className={cn(styles.block, styles.dvlpr)}
                >
                    <Image alt="" src="/images/dvlpr.svg" width={87} height={21} />
                    <h3>Loja oficial da Codecon</h3>
                    <p>Camisetas exclusivas com a qualidade Chico Rei.</p>
                </a>
                <a
                    href="https://codecon.substack.com"
                    target="_blank"
                    rel="noreferrer noopener"
                    className={cn(styles.block, styles.newsletter)}
                >
                    <Image alt="" src="/images/code-weekly.png" width={200} height={27} />
                    <h3>Nossa newsletter</h3>
                    <p>A melhor e única curadoria de links e artigos que você vai precisar.</p>
                </a>
                <a
                    href="https://instagram.com/codecondev"
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
