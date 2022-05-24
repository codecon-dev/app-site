import cn from 'classnames';
import { Speaker as SpeakerType } from '@lib/types';
import styles from './speaker-section.module.css';
import { parseISO, format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Reactions from './reactions';
import Button from './button';
import Speaker from '@components/speaker';
import { SALES_ENABLED, SYMPLA_URL } from '@lib/constants';

type Props = {
  speaker: SpeakerType;
};

const formatDate = (date: string, formatType: string) => {
  return format(parseISO(date), formatType, { locale: pt });
};

const createMarkup = (text: string) => {
  return { __html: text.replace(/(?:\r\n|\r|\n)/g, '<br>') };
};

export default function SpeakerSection({ speaker }: Props) {
  return (
    <>
      <div className={styles.section}>
        <div className={styles.container}>
          <h4 className={cn(styles.tag)}>
            <span>Quem vai</span>
          </h4>

          <div>
            <h1 className={styles.title}>{speaker.name}</h1>
            <h5 className={styles.subtitle}>{speaker.company}</h5>
          </div>

          <div className={styles.grid}>
            <Speaker speaker={speaker} hideName showSocial isPurple noEffect />

            <div className={styles.content}>
              <Reactions id={speaker.id} externalStyles={styles.reactions} />
              <p
                className={styles.description}
                dangerouslySetInnerHTML={createMarkup(speaker.bio)}
              />
            </div>
          </div>
        </div>
      </div>

      <div className={styles.buttonsGrid}>
        {SALES_ENABLED && <Button isYellow blank title="Inscreva-se" url={SYMPLA_URL} />}
        <Button title="Programação completa" url="/programacao" />
      </div>
    </>
  );
}
