 import HeroSponsor from '@components/hero-sponsor';
 import styles from './sponsor-image.module.css';
 import { Sponsor } from '@lib/types';

 export default function SponsorImage({ sponsor }: { sponsor: Sponsor }) {
     return (
       <div className={styles.background} >
			<img
				alt={sponsor.name}
				src={sponsor.logo.url}
				className={styles.image}
				width="700"
			/>
       </div>
     );
 }
 