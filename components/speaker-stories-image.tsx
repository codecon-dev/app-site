 import styles from './speaker-stories-image.module.css';
 import { Speaker } from '@lib/types';

 export default function SpeakerStoriesImage({ speaker }: { speaker: Speaker }) {
     return (
       <div className={styles.background}>
			<div className={styles.box} style={{ backgroundImage: `url("${speaker.imageSquare.url}")` }} />
			<div className={styles.triangle} />
			<h3 className={styles.name}>{speaker.name}</h3>
       </div>
     );
 }
 