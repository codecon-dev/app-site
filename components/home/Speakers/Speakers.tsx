import { Grid, Column } from '@components/_ui/Grid';
import LinkButton from '@components/_ui/LinkButton';
import Activity from '@components/_ui/Activity';
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

      <br />
      <br />

      <Grid>
        <Column lg={5}>
          <Activity sponsor="JetBrains">
            <Activity.Header>
              <p>Painel</p>
              <time>09:00 - 12:00</time>
            </Activity.Header>
            <Activity.Title>Pra que serve, afinal, o DevRel?</Activity.Title>
            <Activity.Footer>
              <Activity.SpeakerImage src="/images/developer.png" alt="lorem" />
              <Activity.SpeakerImage src="/images/developer.png" alt="lorem" />
              <Activity.SpeakerImage src="/images/developer.png" alt="lorem" />
            </Activity.Footer>
          </Activity>
        </Column>

        <Column lg={5}>
          <Activity>
            <Activity.Header>
              <p>Workshop</p>
              <time>22/09 - 09:00 - 12:00</time>
            </Activity.Header>
            <Activity.Title>Aprenda GoLang criando um bot para o Discord</Activity.Title>
            <Activity.Footer>
              <Activity.SpeakerImage src="/images/developer.png" alt="lorem" />
            </Activity.Footer>
            <LinkButton href="/programacao" price={39}>
              Saiba mais
            </LinkButton>
          </Activity>
        </Column>
      </Grid>
    </section>
  );
}
