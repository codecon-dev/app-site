import { Grid, Column } from '@components/_ui/Grid';
import LinkButton from '@components/_ui/LinkButton';
import SpeakerCard from '@components/_ui/SpeakerCard';

import styles from './Speakers.module.scss';

export default function Speakers() {
  return (
    <section>
      <Grid>
        <Column lg={8}>
          <h2>São mais de 20 palestras e painéis com os principais nomes da área</h2>
        </Column>
      </Grid>
      <Grid>
        <Column lg={3} sm={4}>
          <SpeakerCard>
            <SpeakerCard.Title>Bruno Rocha</SpeakerCard.Title>
            <SpeakerCard.Image src="/images/developer.png" alt="lorem" />
          </SpeakerCard>
        </Column>
        <Column lg={3} sm={4}>
          <SpeakerCard>
            <SpeakerCard.Title>Bruno Rocha</SpeakerCard.Title>
            <SpeakerCard.Image src="/images/developer.png" alt="lorem" />
          </SpeakerCard>
        </Column>
        <Column lg={3} sm={4}>
          <SpeakerCard>
            <SpeakerCard.Title>Bruno Rocha</SpeakerCard.Title>
            <SpeakerCard.Image src="/images/developer.png" alt="lorem" />
          </SpeakerCard>
        </Column>
        <Column lg={3} sm={4} xsm={0}>
          <SpeakerCard>
            <SpeakerCard.Title>Bruno Rocha</SpeakerCard.Title>
            <SpeakerCard.Image src="/images/developer.png" alt="lorem" />
          </SpeakerCard>
        </Column>
        <Column lg={3} sm={4} xsm={0}>
          <SpeakerCard>
            <SpeakerCard.Title>Bruno Rocha</SpeakerCard.Title>
            <SpeakerCard.Image src="/images/developer.png" alt="lorem" />
          </SpeakerCard>
        </Column>
        <Column lg={3} sm={4} xsm={0}>
          <SpeakerCard>
            <SpeakerCard.Title>Bruno Rocha</SpeakerCard.Title>
            <SpeakerCard.Image src="/images/developer.png" alt="lorem" />
          </SpeakerCard>
        </Column>
        <Column lg={3} sm={0} xsm={0}>
          <SpeakerCard>
            <SpeakerCard.Title>Bruno Rocha</SpeakerCard.Title>
            <SpeakerCard.Image src="/images/developer.png" alt="lorem" />
          </SpeakerCard>
        </Column>
        <Column lg={3} sm={0} xsm={0}>
          <SpeakerCard>
            <SpeakerCard.Title>Bruno Rocha</SpeakerCard.Title>
            <SpeakerCard.Image src="/images/developer.png" alt="lorem" />
          </SpeakerCard>
        </Column>
      </Grid>

      <Grid>
        <Column lg={12}>
          <div className={styles.cta}>
            <LinkButton href="/programacao">Programação completa</LinkButton>
          </div>
        </Column>
      </Grid>
    </section>
  );
}
