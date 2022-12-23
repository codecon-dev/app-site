import Image from 'next/image';

import { createMarkup } from '@lib/utils';
import { Sponsor } from '@lib/types/all';

import IconTwitter from '@components/_ui/Icons/icon-twitter';
import InstagramIcon from '@components/_ui/Icons/icon-instagram';
import IconLinkedin from '@components/_ui/Icons/icon-linkedin';
import LinkButton from '@components/2022/_ui/LinkButton';
import { Column, Grid } from '@components/_ui/Grid';

import styles from './SponsorPage.module.scss';

type Props = {
    sponsor: Sponsor;
};

export default function SponsorPage({ sponsor }: Props) {
    return (
        <section>
            <Grid>
                <Column lg={4}>
                    <div className={styles.logo} style={{ backgroundColor: sponsor.color.hex }}>
                        <Image src={sponsor.whiteLogo.url} alt={sponsor.name} layout="fill" />
                    </div>
                </Column>
                <Column lg={8}>
                    <div className={styles.cover}>
                        <Image
                            src={sponsor.cover.url}
                            alt={sponsor.name}
                            layout="responsive"
                            width={818}
                            height={400}
                            quality={100}
                        />
                    </div>
                </Column>
            </Grid>
            <Grid>
                <Column lg={4}>
                    <div className={styles.sidebar}>
                        <div className={styles.social}>
                            {sponsor.twitter && (
                                <a href={sponsor.twitter} target="_blank" rel="noreferrer noopener">
                                    <IconTwitter size={32} color="var(--white)" />
                                </a>
                            )}
                            {sponsor.instagram && (
                                <a
                                    href={sponsor.instagram}
                                    target="_blank"
                                    rel="noreferrer noopener"
                                >
                                    <InstagramIcon size={32} color="var(--white)" />
                                </a>
                            )}
                            {sponsor.linkedin && (
                                <a
                                    href={sponsor.linkedin}
                                    target="_blank"
                                    rel="noreferrer noopener"
                                >
                                    <IconLinkedin size={32} color="var(--white)" />
                                </a>
                            )}
                        </div>

                        <LinkButton type="secondary" block href={sponsor.website} newPage>
                            Acesse o site
                        </LinkButton>

                        {sponsor.links.map(link => (
                            <LinkButton
                                key={link.url}
                                type="secondary"
                                block
                                href={link.url}
                                newPage
                            >
                                {link.text}
                            </LinkButton>
                        ))}
                    </div>
                </Column>
                <Column lg={8}>
                    <p
                        className={styles.description}
                        dangerouslySetInnerHTML={createMarkup(sponsor.description)}
                    />

                    {sponsor.youtubeSlug && (
                        <div className={styles.video}>
                            <iframe
                                src={`https://www.youtube.com/embed/${sponsor.youtubeSlug}`}
                                frameBorder="0"
                                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        </div>
                    )}
                </Column>
            </Grid>
        </section>
    );
}
