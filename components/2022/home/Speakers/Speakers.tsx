import { Speaker } from '@lib/types/speakers';

import { Grid, Column } from '@components/_ui/Grid';
import LinkButton from '@components/2022/_ui/LinkButton';
import SpeakerCard from '@components/2022/_ui/SpeakerCard';

import styles from './Speakers.module.scss';

type Props = {
    speakers: Speaker[];
};

export default function Speakers({ speakers }: Props) {
    return (
        <section>
            <Grid>
                <Column lg={8}>
                    <h2 className={styles.title}>
                        São mais de 30 palestras e painéis com os principais nomes da área
                    </h2>
                </Column>
            </Grid>
            <Grid>
                {speakers.map((speaker, index) => (
                    <Column
                        key={speaker.id}
                        lg={3}
                        sm={!!(index > 5) ? 0 : 4}
                        xsm={!!(index > 2) ? 0 : 12}
                    >
                        <SpeakerCard>
                            <SpeakerCard.Title>{speaker.name}</SpeakerCard.Title>
                            <SpeakerCard.Image
                                href={`/2022/quem-vai/${speaker.slug}`}
                                src={speaker.image.url}
                                alt={speaker.name}
                            />
                        </SpeakerCard>
                    </Column>
                ))}
            </Grid>

            <Grid>
                <Column lg={12}>
                    <div className={styles.cta}>
                        <LinkButton href="/2022/programacao">Programação completa</LinkButton>
                    </div>
                </Column>
            </Grid>
        </section>
    );
}
