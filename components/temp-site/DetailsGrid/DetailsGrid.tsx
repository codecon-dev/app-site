import Image from 'next/image';
import cn from 'classnames';

import styles from './DetailsGrid.module.scss';
import IconLogo from '@components/_ui/Icons/icon-logo';
import Button from '@components/_ui/LinkButton/LinkButton';

export default function DetailsGrid() {
    return (
        <section>
            <div className={cn('container', styles.grid)}>
                <a href="/tickets" className={cn(styles.block, styles.ticket)}>
                    <Image alt="" src="/images/seu-ticket.png" width={256} height={145} />
                    <h3>Seu ticket</h3>
                    <p>Gere um ticket com GitHub e compartilhe nas redes sociais</p>
                </a>
                <a
                    href="https://expoville.com.br/"
                    target="_blank"
                    rel="noreferrer noopener"
                    className={cn(styles.block)}
                >
                    <Image alt="" src="/images/mill.svg" width={40} height={46} />

                    <h3>Expoville</h3>
                    <p>Conheça o local onde a Codecon Summit acontecerá.</p>
                    <p>Rua XV de Novembro, 4315 em Joinville, SC.</p>
                </a>
                <a
                    href="https://calendar.google.com/calendar/render?action=TEMPLATE&dates=20240906%2F20240908&details=Um%20dos%20maiores%20encontros%20dev%20do%20sul%20do%20mundo.&location=Expoville%20-%20Rua%20XV%20de%20Novembro%2C%204315%20-%20Joinville%2C%20SC&text=Codecon%20Summit%2024"
                    target="_blank"
                    rel="noreferrer noopener"
                    className={cn(styles.block)}
                >
                    <Image alt="" src="/images/calendar.svg" width={40} height={40} />

                    <h3>Adicione no seu calendário</h3>
                    <p>Clique aqui e salve o evento no seu Google Calendar.</p>
                </a>

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
