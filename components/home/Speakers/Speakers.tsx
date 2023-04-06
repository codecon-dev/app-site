import { ReactNode } from 'react';
import { Speaker } from '@lib/types/speakers';

import SpeakerCard from '@components/_ui/SpeakerCard';

import styles from './Speakers.module.scss';

type Props = {
    speakers: Speaker[];
    children: ReactNode;
};

export default function Speakers({ speakers, children }: Props) {
    return (
        <section className="container">
            <h2 className={styles.title}>{children}</h2>

            <div className={styles.grid}>
                {speakers.map((speaker, index) => (
                    <SpeakerCard href={`/quem-vai/${speaker.slug}`} key={index}>
                        <SpeakerCard.Image src={speaker.image.url} alt={speaker.name} />
                        <SpeakerCard.About>
                            <h5>{speaker.name}</h5>
                            <small>{speaker.company}</small>
                        </SpeakerCard.About>
                    </SpeakerCard>
                ))}
            </div>
        </section>
    );
}
