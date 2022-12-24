import Image from 'next/image';
import cn from 'classnames';

import { Sponsor } from '@lib/types/all';
import IconDiscord from '@components/_ui/Icons/icon-discord';
import IconTwitter from '@components/_ui/Icons/icon-twitter';
import InstagramIcon from '@components/_ui/Icons/icon-instagram';

import styles from './Footer.module.scss';
import styleUtils from '@components/2022/_ui/Utils/Utils.module.scss';
import { Column, Grid } from '@components/_ui/Grid';
import Link from 'next/link';

type Props = {
    sponsors?: Sponsor[];
};

export default function Footer({ sponsors }: Props) {
    const communities = sponsors?.filter(sponsor => sponsor.tier === 'comunidade');
    const partners = sponsors?.filter(sponsor => sponsor.tier !== 'comunidade');

    return (
        <footer className={styles.wrapper}>
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
                    </Column>
                    <Column lg={6} sm={6}>
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
