import cn from 'classnames';

import { Speaker, SocialData } from '@lib/types/speakers';
import { captureHourAndMinutesFromDateString, formatDate } from '@lib/dates';

import { Column, Grid } from '@components/_ui/Grid';
import SpeakerCard from '@components/_ui/SpeakerCard';

import styles from './SpeakerPage.module.scss';
import Activity from '@components/_ui/Activity';

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
      <Grid align="center">
        <Column lg={7} sm={7}>
          <span className="highlight">Presença confirmada</span>
          <h1>{speaker.name}</h1>
          <p className="headline">{speaker.company}</p>

          <SpeakerCard>
            <SpeakerCard.Social
              horizontal
              data={speakerSocial}
              character={!!speaker.character && { src: speaker.character.url, alt: speaker.name }}
            />
          </SpeakerCard>
        </Column>
        <Column lg={1} sm={0} xsm={0} />
        <Column lg={4} sm={4} xsmOrder={1}>
          <SpeakerCard>
            <SpeakerCard.Image src={speaker.image.url} alt={speaker.name} />
          </SpeakerCard>
        </Column>
      </Grid>
      <Grid>
        <Column lg={8}>
          <p className={styles.bio}>{speaker.bio}</p>
        </Column>
      </Grid>

      {(speaker.talks?.length || !!speaker.workshops?.length) && (
        <>
          <div className={cn('container', styles.talks)}>
            <h3>Você poderá ver {speaker.name.split(' ')[0]} em:</h3>
          </div>
          <Grid>
            {speaker.talks?.map(talk => (
              <Column lg={5} key={talk.title}>
                <Activity sponsor={talk.sponsor}>
                  <Activity.Header>
                    <p>{talk.talkType}</p>
                    <time>
                      {formatDate(talk.start, 'dd/MM')} |{' '}
                      {captureHourAndMinutesFromDateString(talk.start)} ~{' '}
                      {captureHourAndMinutesFromDateString(talk.end)}
                    </time>
                  </Activity.Header>
                  <Activity.Title href={`/programacao/${talk.slug}`}>{talk.title}</Activity.Title>
                  <Activity.Button href={`/programacao/${talk.slug}`}>
                    Mais detalhes
                  </Activity.Button>
                </Activity>
              </Column>
            ))}

            {speaker.workshops?.map(workshop => (
              <Column lg={5} key={workshop.title}>
                <Activity sponsor={workshop.sponsor}>
                  <Activity.Header>
                    <p>Workshop</p>
                    <time>
                      {formatDate(workshop.start, 'dd/MM')} |{' '}
                      {captureHourAndMinutesFromDateString(workshop.start)} ~{' '}
                      {captureHourAndMinutesFromDateString(workshop.end)}
                    </time>
                  </Activity.Header>
                  <Activity.Title href={`/workshops/${workshop.slug}`}>
                    {workshop.title}
                  </Activity.Title>

                  <Activity.Button href={`/workshops/${workshop.slug}`}>
                    Mais detalhes
                  </Activity.Button>
                </Activity>
              </Column>
            ))}
          </Grid>
        </>
      )}
    </section>
  );
}
