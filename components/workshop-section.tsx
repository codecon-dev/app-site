
 import cn from 'classnames';
import Link from 'next/link';
 import { Workshop } from '@lib/types';
 import styles from './workshop-section.module.css';
 import { parseISO, format } from 'date-fns';
 import pt from 'date-fns/locale/pt'
 import Reactions from './reactions';
 import Button from './button';
import { SYMPLA_URL } from '@lib/constants';
 
 type Props = {
   workshop: Workshop;
 };
 
 const formatDate = (date: string, formatType: string) => {
   return format(parseISO(date), formatType, { locale: pt });
 };
 
 const createMarkup = (text: string) => {
   return {__html: text.replace(/(?:\r\n|\r|\n)/g, '<br>')};
 }
 
 export default function SpeakerSection({ workshop }: Props) {
   return (
	 <>
	 <div className={styles.section}>
		 <div className={styles.container}>
			 <h4 className={cn(styles.talkType)}>
				 <span>Workshop</span>
			 </h4>
 
			 <h1 className={styles.title}>{workshop.title}</h1>

			 <div className={styles.photo}>
				{workshop.teacher.map(s => (
				  <Link href={`/quem-vai/${s.slug}`}>
					<a className={styles.speaker}>
						<img src={s.imageSquare.url} alt={s.name} />
						<h4>{s.name}</h4>
					</a>
				  </Link>
				))}
			</div>
 
			 <div className={styles.content}>
				 
				 <span className={styles.date}>
					 {formatDate(workshop.start, 'dd/MM')} - {formatDate(workshop.start, 'HH:mm')} ~ {formatDate(workshop.end, 'HH:mm')}
				 </span>
 
				 <Reactions id={workshop.id} externalStyles={styles.reactions} />
 
				 <p className={styles.description} dangerouslySetInnerHTML={createMarkup(workshop.description)} />
 
			 </div>
		 </div>
	 </div>
	 <div className={styles.buttonsGrid}>
      <Button
        isYellow
        blank
        title="Inscreva-se"
        url={SYMPLA_URL}
      />
      <Button
          title="Todos os workhops"
          url="/workshops"
      />
    </div>
	 </>
   );
 }
 