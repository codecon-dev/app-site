import { useContext } from 'react';
import Image from 'next/image';
import cn from 'classnames';

import ThemeContext from 'context/ThemeContext';
import { Sponsor } from '@lib/types/all';
import IconDiscord from '@components/_ui/Icons/icon-discord';
import IconTwitter from '@components/_ui/Icons/icon-twitter';
import InstagramIcon from '@components/_ui/Icons/icon-instagram';

import styles from './Footer.module.scss';
import styleUtils from '@components/_ui/Utils/Utils.module.scss';
import { Column, Grid } from '../../_ui/Grid';
import DarkModeToggle from '../DarkModeToggle/DarkModeToggle';

type Props = {
    sponsors?: Sponsor[];
};

export default function Footer({ sponsors }: Props) {
    const communities = sponsors?.filter(sponsor => sponsor.tier === 'comunidade');
    const sponsorsEvent = sponsors?.filter(sponsor => sponsor.tier !== 'patrocinador');
    const partners = sponsors?.filter(sponsor => sponsor.tier === 'apoio');

    const theme = useContext(ThemeContext);

    return (
        <footer className={styles.wrapper}>
            {sponsors && (
                <div className={cn('container', styles.grid)}>
                    <h2 className={styles.title}>
                        Patrocinadores da <br className={styleUtils['hide-on-mobile']} />
                        Codecon <span className={styles.caps}>{theme}</span> 2023
                    </h2>

                    {sponsorsEvent?.map(s => (
                        <a
                            className={styles.sponsor}
                            key={s.slug}
                            href={s.website}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Image width={220} height={120} src={s.logo.url} alt={s.name} />
                        </a>
                    ))}

                    <hr className={styles.hr} />

                    <h3 className={styles.title}>Apoio</h3>

                    {partners?.map(s => (
                        <a
                            className={styles.sponsor}
                            key={s.slug}
                            href={s.website}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Image width={130} height={71} src={s.logo.url} alt={s.name} />
                        </a>
                    ))}

                    <hr className={styles.hr} />

                    <h3 className={styles.title}>Comunidades que estão com a gente nessa</h3>

                    {communities?.map(s => (
                        <a
                            className={styles.sponsor}
                            key={s.slug}
                            href={s.website}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Image width={130} height={71} src={s.logo.url} alt={s.name} />
                        </a>
                    ))}
                </div>
            )}

            <div className={styles.footer}>
                <Grid>
                    <Column lg={6} sm={6}>
                        A Codecon preza pela inclusão e diversidade.{' '}
                        <br className={styleUtils['hide-on-mobile']} />
                        Seguimos o{' '}
                        <a
                            href="https://www.codamos.club/codigo-de-conduta"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            código de conduta da Codamos
                        </a>
                        .
                        <DarkModeToggle />
                    </Column>
                    <Column lg={6} sm={6}>
                        <div className={styles.social}>
                            <a
                                className={styles.icon}
                                href="https://twitter.com/codecondev"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <IconTwitter size={16} color="#fff" />
                            </a>

                            <a
                                className={styles.icon}
                                href="https://www.instagram.com/codecon.dev/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <InstagramIcon size={16} color="#fff" />
                            </a>

                            <a
                                className={styles.icon}
                                href="https://codecon.dev/discord"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <IconDiscord size={16} color="#fff" />
                            </a>
                        </div>
                        <div className={styles.vercel}>
                            <a
                                href="https://vercel.com/?utm_source=codecon&utm_campaign=oss"
                                target="_blank"
                                rel="noreferrer noopener"
                            >
                                <Image
                                    width={215}
                                    height={45}
                                    src="/powered-by-vercel.svg"
                                    alt="Powered by Vercel"
                                />
                            </a>
                        </div>
                    </Column>
                </Grid>
            </div>
        </footer>
    );
}
