import IconDiscord from '@components/_ui/Icons/icon-discord';
import IconLogo from '@components/_ui/Icons/icon-logo';
import WhatsApp from '@components/_ui/Icons/icon-whatsapp';
import { WHATSAPP_LINK } from '@lib/constants';

import styles from './Links.module.scss';

export default function Links() {
    return (
        <div className={styles.section}>
            <div className={styles.container}>
                <div className={styles['img-wrapper']}>
                    <IconLogo />
                </div>

                <div className={styles.content}>
                    <div className={styles['links-wrapper']}>
                        <a
                            href={WHATSAPP_LINK}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.button}
                        >
                            <span className={styles.truncate}>Fale com a gente no WhatsApp</span>
                            <WhatsApp size={24} />
                        </a>
                        <a
                            href="https://codecon.dev/discord"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.button}
                        >
                            <span className={styles.truncate}>Entre no nosso Discord</span>
                            <IconDiscord color="#ffffff" size={16} />
                        </a>
                        <a
                            href="https://www.youtube.com/watch?v=tZafPe3X9XA"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.button}
                        >
                            <span className={styles.truncate}>Vídeo com dicas sobre o evento</span>
                            <svg
                                viewBox="0 0 24 24"
                                width="16"
                                height="16"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                fill="none"
                                shapeRendering="geometricPrecision"
                            >
                                <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                                <path d="M15 3h6v6" />
                                <path d="M10 14L21 3" />
                            </svg>
                        </a>
                        <a
                            href="https://onionrings.notion.site/Manual-da-Codecon-no-Gather-75e2e019a26c469bad4e8bfcf582d2f0"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.button}
                        >
                            <span className={styles.truncate}>Manual da Codecon no Gather</span>
                            <svg
                                viewBox="0 0 24 24"
                                width="16"
                                height="16"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                fill="none"
                                shapeRendering="geometricPrecision"
                            >
                                <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                                <path d="M15 3h6v6" />
                                <path d="M10 14L21 3" />
                            </svg>
                        </a>
                    </div>
                    E-mail: <a href="mailto:contato@codecon.dev">contato@codecon.dev</a>
                </div>
            </div>
        </div>
    );
}
