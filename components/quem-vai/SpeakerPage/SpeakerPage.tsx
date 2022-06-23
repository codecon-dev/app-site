import { Speaker, SocialData } from '@lib/types/speakers';

import { Column, Grid } from '@components/_ui/Grid';
import SpeakerCard from '@components/_ui/SpeakerCard';

import styles from './SpeakerPage.module.scss';

type Props = {
  speaker: Speaker;
};

export default function SpeakerPage({ speaker }: Props) {
  return (
    <section>
      <Grid>
        <Column lg={12}>
          <h1>{speaker.name}</h1>
        </Column>
      </Grid>
    </section>
  );
}
