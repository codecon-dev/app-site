import { Fragment, ReactNode, useContext } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import ThemeContext from 'context/ThemeContext';
import { Speaker, SocialData } from '@lib/types/speakers';

import { Column, Grid } from '@components/_ui/Grid';
import SpeakerCard from '@components/_ui/SpeakerCard';

import styles from './SpeakersGrid.module.scss';

type Props = {
    speakers: Speaker[];
    type?: 'full' | 'home';
    children?: ReactNode;
};

function parseCompany(company: string) {
    const [role, ...companyName] = company.split(/ na | no | at | nos /);
    if (!companyName || !companyName.length) return company;
    return (
        <>
            {role} <span>•</span> {companyName}
        </>
    );
}

export default function SpeakersGrid({ speakers, type = 'full', children }: Props) {
    const theme = useContext(ThemeContext);

    if (type === 'home') {
        return (
            <section className="container">
                <h2 className={styles.title}>{children}</h2>

                <div className={styles.grid}>
                    {speakers.map((speaker, index) => (
                        <Link
                            href={`/${theme}/quem-vai/${speaker.slug}`}
                            className={styles.speaker}
                            key={index}
                        >
                            <div className={styles['speaker-bg']}>
                                <div className={styles['speaker-description']}>
                                    <h5>{speaker.name}</h5>
                                    <small>{parseCompany(speaker.company)}</small>
                                </div>

                                <Image src={speaker.image.url} alt={speaker.name} fill />
                            </div>
                        </Link>
                    ))}
                </div>
            </section>
        );
    }

    return (
        <section>
            <Grid>
                {speakers?.map((speaker, index) => {
                    let speakerSocial: SocialData[] = [];

                    if (speaker.twitter) {
                        speakerSocial = [
                            ...speakerSocial,
                            { label: 'Twitter', url: speaker.twitter }
                        ];
                    }

                    if (speaker.github) {
                        speakerSocial = [
                            ...speakerSocial,
                            { label: 'GitHub', url: speaker.github }
                        ];
                    }

                    if (speaker.linkedin) {
                        speakerSocial = [
                            ...speakerSocial,
                            { label: 'Linkedin', url: speaker.linkedin }
                        ];
                    }

                    return (
                        <Fragment key={speaker.id}>
                            {!!(index % 2) && (
                                <Column key={`col-${speaker.id}`} lg={2} sm={0} xsm={0} />
                            )}
                            <Column key={speaker.id} lg={5} sm={6} className={styles.card}>
                                <div className={styles.card_content}>
                                    <SpeakerCard href={`/quem-vai/${speaker.slug}`}>
                                        <SpeakerCard.Image
                                            src={speaker.image.url}
                                            alt={speaker.name}
                                        />
                                        <SpeakerCard.About>
                                            <h5>{speaker.name}</h5>
                                            <small>{parseCompany(speaker.company)}</small>
                                        </SpeakerCard.About>
                                    </SpeakerCard>
                                    <SpeakerCard.Social data={speakerSocial} />
                                </div>
                            </Column>
                        </Fragment>
                    );
                })}
            </Grid>
        </section>
    );
}
