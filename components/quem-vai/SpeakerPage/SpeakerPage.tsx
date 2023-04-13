import cn from 'classnames';

import { Speaker, SocialData } from '@lib/types/speakers';
import { captureHourAndMinutesFromDateString, formatDate } from '@lib/dates';

import { Column, Grid } from '@components/_ui/Grid';
import SpeakerCard from '@components/_ui/SpeakerCard';

import styles from './SpeakerPage.module.scss';
import Activity from '@components/_ui/Activity';
import Image from 'next/image';

type Props = {
    speaker: Speaker;
};

export default function SpeakerPage({ speaker }: Props) {
    let speakerSocial: SocialData[] = [];

    if (speaker.twitter) {
        speakerSocial = [...speakerSocial, { label: 'Twitter', url: speaker.twitter }];
    }

    if (speaker.github) {
        speakerSocial = [...speakerSocial, { label: 'GitHub', url: speaker.github }];
    }

    if (speaker.linkedin) {
        speakerSocial = [...speakerSocial, { label: 'Linkedin', url: speaker.linkedin }];
    }

    return (
        <section>
            <Grid>
                <Column lg={4} sm={4} xsmOrder={1}>
                    <div className={styles.sidebar}>
                        <div className={styles.image}>
                            <Image src={speaker.image.url} alt={speaker.name} fill />
                        </div>

                        <div className={styles.social}>
                            <SpeakerCard.Social horizontal data={speakerSocial} />
                        </div>
                    </div>
                </Column>

                <Column lg={7} sm={8}>
                    <span className="highlight">Presença confirmada</span>
                    <h1>{speaker.name}</h1>
                    <p className={styles.headline}>{speaker.company}</p>
                    <p className={styles.bio}>{speaker.bio}</p>

                    {(speaker.talks?.length || !!speaker.workshops?.length) && (
                        <>
                            <div className={cn(styles.talks)}>
                                <h3>Você poderá ver {speaker.name.split(' ')[0]} em:</h3>
                                {speaker.talks?.map(talk => (
                                    <Activity sponsor={talk.sponsor}>
                                        <Activity.Header>
                                            <p>{talk.talkType}</p>
                                            <time>
                                                {talk.place} • {formatDate(talk.start, 'dd/MM')} |{' '}
                                                {captureHourAndMinutesFromDateString(talk.start)} ~{' '}
                                                {captureHourAndMinutesFromDateString(talk.end)}
                                            </time>
                                        </Activity.Header>
                                        <Activity.Title href={`/programacao/${talk.slug}`}>
                                            {talk.title}
                                        </Activity.Title>
                                        <Activity.Button href={`/programacao/${talk.slug}`}>
                                            Mais detalhes
                                        </Activity.Button>
                                    </Activity>
                                ))}
                            </div>
                        </>
                    )}
                </Column>
            </Grid>
        </section>
    );
}
