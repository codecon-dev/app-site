import { Workshop } from '@lib/types/all';
import {
  captureHourAndMinutesFromDateString,
  formatDate,
  isActivityStartingOnDay
} from '@lib/dates';

import { Grid, Column } from '@components/_ui/Grid';
import Activity from '@components/_ui/Activity';

import styles from './Schedule.module.scss';

type Props = {
  workshops: Workshop[];
};

enum DAYS {
  THUSDAY = 0,
  FRIDAY = 1,
  SATURDAY = 2
}

function WorkshopCard({ workshop }: { workshop: Workshop }) {
  return (
    <Column lg={6} sm={6} key={workshop.id}>
      <Activity sponsor={workshop.sponsor ? workshop.sponsor : undefined}>
        <Activity.Header>
          <p>Workshop</p>
          <time>
            {formatDate(workshop.start, 'dd/MM')} |{' '}
            {captureHourAndMinutesFromDateString(workshop.start)} ~{' '}
            {captureHourAndMinutesFromDateString(workshop.end)}
          </time>
        </Activity.Header>
        <Activity.Title href={`/workshops/${workshop.slug}`}>{workshop.title}</Activity.Title>
        <Activity.Footer>
          {workshop.teacher.map(t => (
            <Activity.SpeakerImage href={`/quem-vai/${t.slug}`} src={t.image.url} alt={t.name} />
          ))}
        </Activity.Footer>
        <Activity.Button
          disabled={workshop.vagas === 0}
          info={workshop.vagas === 0 ? undefined : `${workshop.vagas} vagas`}
          href={workshop.link || '#'}
        >
          {workshop.vagas === 0 ? 'Esgotado' : 'Inscreva-se'}
        </Activity.Button>
      </Activity>
    </Column>
  );
}

export default function Schedule({ workshops }: Props) {
  const workshopsByDay = [
    workshops.filter(workshop => isActivityStartingOnDay(workshop, '22/09/2022')),
    workshops.filter(workshop => isActivityStartingOnDay(workshop, '23/09/2022')),
    workshops.filter(workshop => isActivityStartingOnDay(workshop, '24/09/2022'))
  ];

  return (
    <section>
      <Grid>
        <Column lg={12}>
          <h3>Quinta (22/09)</h3>
        </Column>
        {workshopsByDay[DAYS.THUSDAY].map(workshop => (
          <WorkshopCard workshop={workshop} key={workshop.id} />
        ))}
      </Grid>
      <Grid className={styles.grid}>
        <Column lg={12}>
          <h3>Sexta (23/09)</h3>
        </Column>
        {workshopsByDay[DAYS.FRIDAY].map(workshop => (
          <WorkshopCard workshop={workshop} key={workshop.id} />
        ))}
      </Grid>
      <Grid className={styles.grid}>
        <Column lg={12}>
          <h3>Sábado (24/09)</h3>
        </Column>
        {workshopsByDay[DAYS.SATURDAY].map(workshop => (
          <WorkshopCard workshop={workshop} key={workshop.id} />
        ))}
      </Grid>
    </section>
  );
}
