import { Speaker, SocialData } from '@lib/types/speakers';

import { Column, Grid } from '@components/_ui/Grid';
import SpeakerCard from '@components/_ui/SpeakerCard';

import styles from './SpeakersGrid.module.scss';

type Props = {
  speakers: Speaker[];
};

export default function WorkshopsGrid({ speakers }: Props) {
  return (
    <section>
      <Grid>
        {speakers?.map((speaker, index) => {
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
            <>
              {!!(index % 2) && <Column key={`col-${speaker.id}`} lg={2} sm={0} xsm={0} />}
              <Column key={speaker.id} lg={5} sm={6} className={styles.card}>
                <SpeakerCard>
                  <SpeakerCard.Image
                    href={`/quem-vai/${speaker.slug}`}
                    src={speaker.image.url}
                    alt={speaker.name}
                  />
                  <SpeakerCard.About>
                    <h5>{speaker.name}</h5>
                    <small>{speaker.company}</small>
                  </SpeakerCard.About>
                  <SpeakerCard.Social
                    data={speakerSocial}
                    character={
                      !!speaker.character && { src: speaker.character?.url, alt: 'Bruno Rocha' }
                    }
                  />
                </SpeakerCard>
              </Column>
            </>
          );
        })}
      </Grid>
    </section>
  );
}
