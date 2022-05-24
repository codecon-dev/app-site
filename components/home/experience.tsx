import Link from 'next/link';

import Speaker from '@components/speaker';
import styles from './experience.module.css';

import { Speaker as SpeakerType } from '@lib/types';

type Props = {
	speakers: SpeakerType[];
};
  
export default function Experience({ speakers }: Props) {
	return (
		<section className={styles.container}>
			<div className={styles.wrapper}>
				<div className={styles.titleContainer}>
					<h2 className={styles.title}>Uma experiência <span>digital</span></h2>
					<h4 className={styles.subtitle}>Como você nunca viu</h4>
				</div>
				<p className={styles.text}>O evento vai rolar na Dark City, uma cidade digital que vamos criar no Gather. Vai ter um monte de atrações, todo do conteúdo que você ama, muita interatividade e, é claro, a presença de devs e devas f*d@s.</p>
			</div>
			<div className={styles.speakers}>
				{speakers.map(s => (
					<Speaker key={s.name} speaker={s} />
				))}
			</div>

			<Link href="/programacao">
			  <a className={styles.button}>
			  	Confira a programação completa
			  </a>
			</Link>
		</section>
	);
}
 