import { Fragment } from 'react';
import { Speaker, SocialData } from '@lib/types/speakers';

import { Column, Grid } from '@components/_ui/Grid';
import SpeakerCard from '@components/_ui/SpeakerCard';

import styles from './SpeakersGrid.module.scss';
import { useRouter } from 'next/router';

type Props = {
    speakers: Speaker[];
};

export default function SpeakersGrid({ speakers }: Props) {
    const router = useRouter();
    const event = router?.asPath?.split('/')[1] || '';
    const eventPath = event ? `/${event}` : '';

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
                    const href = `${eventPath}/quem-vai/${speaker.slug}`;
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
                                <SpeakerCard href={href}>
                                    <SpeakerCard.Image src={speaker.image.url} alt={speaker.name} />
                                    <SpeakerCard.About>
                                        <h5>{speaker.name}</h5>
                                        <small>{parseCompany(speaker.company)}</small>
                                    </SpeakerCard.About>
                                    <SpeakerCard.Social data={speakerSocial} />
                                </SpeakerCard>
                            </Column>
                        </Fragment>
                    );
                })}
            </Grid>
        </section>
    );
}
