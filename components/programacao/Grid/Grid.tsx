import Image from 'next/image';

import { Workshop } from '@lib/types';
import { captureHourAndMinutesFromDateString, formatDate } from '@lib/dates';

import styles from './Grid.module.scss';

function WorkshopCard({ workshop }: { workshop: Workshop }) {
  return (
    <div className={styles.card}>
      <div className={styles.details}>
        <div className={styles.images}>
          {workshop.teacher.map((t, index) => (
            <Image key={index} src={t.imageSquare.url} width={64} height={64} alt={t.name} />
          ))}
        </div>
        <span>
          &#123; speaker: '
          {workshop.teacher.map((t, index) => (
            <span key={t.id}>
              {index > 0 && "', '"}
              {t.name}
            </span>
          ))}
          ' &#125;
        </span>
      </div>

      <div>
        <h2>{workshop.title}</h2>

        <p>{workshop.description}</p>
      </div>

      <div className={styles.footer}>
        <div className={styles.footerDetails}>
          <span>
            {formatDate(workshop.start, 'dd/MM/yy')} às{' '}
            {captureHourAndMinutesFromDateString(workshop.start)}
          </span>
          {workshop.vagas > 0 && <span>{workshop.vagas} vagas</span>}
        </div>
        {workshop.link ? (
          <a
            className={styles.button}
            href={workshop.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            inscreva-se
          </a>
        ) : (
          <span className={styles.disabledButton}>inscrições em breve</span>
        )}
      </div>
    </div>
  );
}

type Props = {
  workshops: Workshop[];
};

export default function WorkshopsGrid({ workshops }: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        {workshops.map(workshop => (
          <WorkshopCard key={workshop.slug} workshop={workshop} />
        ))}
      </div>
    </div>
  );
}
