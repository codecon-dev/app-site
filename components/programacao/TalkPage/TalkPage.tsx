import cn from 'classnames';

import { Talk } from '@lib/types/all';
import { captureHourAndMinutesFromDateString, formatDate } from '@lib/dates';

import { Column, Grid } from '@components/_ui/Grid';
import SpeakerCard from '@components/_ui/SpeakerCard';

import styles from './TalkPage.module.scss';
import LinkButton from '@components/_ui/LinkButton';

type Props = {
  talk: Talk;
};

export default function TalkPage({ talk }: Props) {
  return (
    <section>
      <Grid align="center">
        <Column lg={7} sm={7}>
          <span className="highlight">{talk.talkType}</span>
          <h1 className={styles.title}>{talk.title}</h1>
          <p className="headline">
            {formatDate(talk.start, 'dd/MM')} <span className="bullet">•</span>{' '}
            {captureHourAndMinutesFromDateString(talk.start)} ~{' '}
            {captureHourAndMinutesFromDateString(talk.end)} <span className="bullet">•</span>{' '}
            {talk.place}
          </p>
        </Column>
        <Column lg={talk.speaker && talk.speaker?.length > 1 ? 0 : 1} sm={0} xsm={0} />
        <Column lg={talk.speaker && talk.speaker?.length > 1 ? 5 : 4} sm={5} xsmOrder={1}>
          {talk.speaker && (
            <div className={cn({ [styles.speakers]: talk.speaker?.length > 1 })}>
              {talk.speaker?.map(speaker => (
                <SpeakerCard key={speaker.id}>
                  <SpeakerCard.Image
                    href={`/quem-vai/${speaker.slug}`}
                    src={speaker.image.url}
                    alt={speaker.name}
                  />
                </SpeakerCard>
              ))}
              {talk.host && (
                <SpeakerCard key={talk.host.id}>
                  <SpeakerCard.Image
                    href={`/quem-vai/${talk.host.slug}`}
                    src={talk.host.image.url}
                    alt={talk.host.name}
                    isHost
                  />
                </SpeakerCard>
              )}
            </div>
          )}
        </Column>
      </Grid>
      <Grid>
        <Column lg={8}>
          <p className={styles.description}>{talk.description}</p>
        </Column>
      </Grid>

      <div className="container">
        <LinkButton href="/programacao">Confira a programação completa</LinkButton>
      </div>
    </section>
  );
}
