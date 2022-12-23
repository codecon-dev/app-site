import cn from 'classnames';

import { nl2br } from '@lib/utils';
import { Workshop } from '@lib/types/all';
import { captureHourAndMinutesFromDateString, formatDate } from '@lib/dates';

import { Column, Grid } from '@components/_ui/Grid';
import SpeakerCard from '@components/2022/_ui/SpeakerCard';

import styles from './WorkshopPage.module.scss';
import LinkButton from '@components/2022/_ui/LinkButton';

type Props = {
    workshop: Workshop;
};

export default function WorkshopPage({ workshop }: Props) {
    const isWorkshopFull = workshop.vagas === 0;

    return (
        <section>
            <Grid align="center">
                <Column lg={7} sm={7}>
                    <span className="highlight">Workshop</span>
                    <h1 className={styles.title}>{workshop.title}</h1>
                    <p className="headline">
                        {formatDate(workshop.start, 'dd/MM')} <span className="bullet">•</span>{' '}
                        {captureHourAndMinutesFromDateString(workshop.start)} ~{' '}
                        {captureHourAndMinutesFromDateString(workshop.end)}
                    </p>
                </Column>
                <Column
                    lg={workshop.teacher && workshop.teacher?.length > 1 ? 0 : 1}
                    sm={0}
                    xsm={0}
                />
                <Column
                    lg={workshop.teacher && workshop.teacher?.length > 1 ? 5 : 4}
                    sm={5}
                    xsmOrder={1}
                >
                    {workshop.teacher && (
                        <div className={cn({ [styles.teachers]: workshop.teacher?.length > 1 })}>
                            {workshop.teacher?.map(teacher => (
                                <SpeakerCard key={teacher.id}>
                                    <SpeakerCard.Image
                                        href={`/2022/quem-vai/${teacher.slug}`}
                                        src={teacher.image.url}
                                        alt={teacher.name}
                                    />
                                </SpeakerCard>
                            ))}
                        </div>
                    )}
                </Column>
            </Grid>
            <Grid>
                <Column lg={8}>
                    <p
                        className={styles.description}
                        dangerouslySetInnerHTML={{ __html: nl2br(workshop.description) }}
                    />
                </Column>
            </Grid>

            <div className={cn('container', styles.buttons)}>
                <LinkButton
                    disabled={isWorkshopFull}
                    info={isWorkshopFull ? undefined : `${workshop.vagas} vagas`}
                    href={workshop.link || '#'}
                    newPage
                >
                    {isWorkshopFull ? 'Esgotado' : 'Inscreva-se'}
                </LinkButton>
                <LinkButton href="/2022/workshops">Confira a programação completa</LinkButton>
            </div>
        </section>
    );
}
