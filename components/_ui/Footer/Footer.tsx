import { useContext } from 'react';
import Image from 'next/image';
import Link from 'next/link';
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
    const sponsorsEvent = sponsors?.filter(sponsor => sponsor.tier === 'patrocinador');
    const partners = sponsors?.filter(sponsor => sponsor.tier === 'apoio');

    const theme = useContext(ThemeContext);

    return (
        <footer className={styles.wrapper}>
            {sponsors && (
                <div className={cn('container', styles.grid)}>
                    {sponsorsEvent?.length && (
                        <>
                            <h2 className={styles.title}>
                                Patrocinadores da <br className={styleUtils['hide-on-mobile']} />
                                Codecon{' '}
                                <span className={cn({ [styles.caps]: theme != 'summit' })}>
                                    {theme}
                                </span>{' '}
                                2023
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
                        </>
                    )}

                    {partners?.length && (
                        <>
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
                        </>
                    )}

                    {communities?.length && (
                        <>
                            <h3 className={styles.title}>
                                Comunidades que estão com a gente nessa
                            </h3>

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

                            <hr className={styles.hr} />
                        </>
                    )}

                    <div className={styles.people}>
                        <Grid>
                            <Column lg={4} sm={4}>
                                <h3 className={styles.title}>Realização/idealização</h3>
                                <ul>
                                    <li>
                                        <a href="https://twitter.com/nunesgabriel">
                                            Gabriel Nunes @nunesgabriel
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://www.linkedin.com/in/paula-c-gabriel/">
                                            Paula Caroline
                                        </a>
                                    </li>
                                </ul>
                                {theme === 'digital' && (
                                    <>
                                        <br />
                                        <h3 className={styles.title}>Artes em pixel art</h3>
                                        <ul>
                                            <li>
                                                <a href="https://rafaelmatos.itch.io/">
                                                    Rafael Matos
                                                </a>
                                            </li>
                                            <li>
                                                <a href="https://twitter.com/Hypnos_art">Hypnos</a>
                                            </li>
                                        </ul>
                                    </>
                                )}
                            </Column>

                            <Column lg={4} sm={4}>
                                <h3 className={styles.title}>Co-curadoria dos eventos</h3>
                                <ul>
                                    <li>
                                        <a href="https://twitter.com/eminetto">
                                            Elton Minetto @eminetto
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://twitter.com/jessilyneh">
                                            Jess @jessilyneh
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://twitter.com/_StaticVoid">
                                            Lucas Santos @_StaticVoid
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://twitter.com/marcelgsantos">
                                            Marcel @marcelgsantos
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://twitter.com/morgannadev">
                                            Morganna @morgannadev
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://twitter.com/coproduto">
                                            Pedro Castilho @coproduto
                                        </a>
                                    </li>
                                </ul>
                            </Column>
                            <Column lg={4} sm={4}>
                                <h3 className={styles.title}>Voluntários Codecon</h3>
                                <ul>
                                    <li>
                                        <a href="https://twitter.com/dudscr">
                                            Eduarda Cristina @dudscr
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://twitter.com/focezar">
                                            Fernando Cezar @focezar
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://twitter.com/gabogaldino">
                                            Gabriel Galdino @gabogaldino
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://twitter.com/giovanabrrts">
                                            Giovana Barretos @giovanabrrts
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://twitter.com/jnassula">
                                            Jonata Nassula @jnassula
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://twitter.com/kaiofelipejs">
                                            Kaio Felipe @kaiofelipejs
                                        </a>
                                    </li>
                                </ul>
                            </Column>
                        </Grid>
                    </div>
                </div>
            )}

            <div className={styles.footer}>
                <Grid>
                    <Column lg={6} sm={6}>
                        A Codecon preza pela inclusão e diversidade.{' '}
                        <br className={styleUtils['hide-on-mobile']} />
                        Confira o{' '}
                        <a
                            href="https://github.com/codecon-dev/codecon/blob/main/CODE_OF_CONDUCT.md"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            nosso código de conduta
                        </a>
                        .
                        <DarkModeToggle />
                    </Column>
                    <Column lg={6} sm={6}>
                        <div className={styles.social}>
                            <Link href="/digital/contato">Contato</Link>
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
                                href="https://www.instagram.com/codecondev/"
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
