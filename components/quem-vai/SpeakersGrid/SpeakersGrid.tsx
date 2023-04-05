import { Fragment } from 'react';
import { Speaker, SocialData } from '@lib/types/speakers';

import { Column, Grid } from '@components/_ui/Grid';
import SpeakerCard from '@components/_ui/SpeakerCard';

import styles from './SpeakersGrid.module.scss';

type Props = {
    speakers: Speaker[];
};

export default function SpeakersGrid({ speakers }: Props) {
    function parseCompany(company: string) {
        const text = company.split(/ na | no | at /);
        if (!text[1]) return company;
        return (
            <>
                {text[0]} <span>•</span> {text[1]}
            </>
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
