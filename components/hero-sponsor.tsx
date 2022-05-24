import Image from 'next/image';
import Logo from './icons/icon-logo';

import styles from './hero-sponsor.module.css';
import cn from 'classnames';
import { Sponsor } from '@lib/types';
import { contrast } from '@lib/contrast-ratio';


 export default function HeroSponsor({ sponsor }: { sponsor: Sponsor }) {
	const contrastRatio = contrast(sponsor.color.hex);

    return (
        <div className={styles['img-bg']} style={{backgroundColor: sponsor.color.hex}}>
			{contrastRatio > 4.5 ? (
				<img
					alt='Codecon'
					src='/logo.svg'
					className={styles.image}
					title={sponsor.name}
					width="30%"
				/>
			) : (
				<img
					alt='Codecon'
					src='/logo-black.svg'
					className={styles.image}
					title={sponsor.name}
					width="30%"
				/>
			)}
            
            <img
                alt={sponsor.name}
                src={sponsor.whiteLogo.url}
                className={styles.image}
                loading="lazy"
                width="30%"
            />
        </div>
    );
 }
 