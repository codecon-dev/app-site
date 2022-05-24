import cn from 'classnames';
import Link from 'next/link';

import TwitterIcon from '@components/icons/icon-twitter';
import GithubIcon from '@components/icons/icon-github';
import { Speaker as SpeakerType } from '@lib/types';
import styles from './speaker.module.css';

type Props = {
	speaker: SpeakerType;
	showSocial?: boolean;
	isPurple?: boolean;
	hideName?: boolean;
	noEffect?: boolean;
};

export default function Speaker({ speaker, showSocial, isPurple, hideName, noEffect }: Props) {
	return (
		<div>
			<Link href={`/quem-vai/${speaker.slug}`}>
				<a className={styles.link}>
					<div className={cn({
						[styles.wrapper]: !noEffect,
						[styles.wrapperClean]: noEffect,
						[styles.isPurple]: isPurple,
					})}>
						<div className={styles.box} style={{ backgroundImage: `url("${speaker.imageSquare.url}")` }} />
						{!hideName && <h3 className={styles.name}>{speaker.name}</h3>}
					</div>
					</a>
			</Link>
			{showSocial && (
				<div className={styles.social}>
					{speaker.github && (
						<a href={speaker.github} target="_blank" rel="noopener noreferrer">
							<GithubIcon color={ isPurple ? '#724BFE' : '#EEF253'} size={24} /> GitHub
						</a>
					)}

					{speaker.twitter && (
						<a href={speaker.twitter} target="_blank" rel="noopener noreferrer">
							<TwitterIcon color={ isPurple ? '#724BFE' : '#EEF253'} size={24} /> Twitter
						</a>
					)}
				</div>
			)}
		</div>
	);
			
}