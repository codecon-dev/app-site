 import HeroSponsor from '@components/hero-sponsor';
 import styles from './sponsor-stories-image.module.css';
 import { Sponsor } from '@lib/types';

 export default function SponsorImage({ sponsor }: { sponsor: Sponsor }) {
     return (
		<div className={styles.background} >
			<img
				alt={sponsor.name}
				src={sponsor.logo.url}
				className={styles.image}
				width="650"
			/>
	</div>
     );
 }
 