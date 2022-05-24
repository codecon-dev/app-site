import { useRouter } from 'next/router';
import { Talk } from '@lib/types';
import Header from './header';
import styles from './room-schedule.module.css';
import TalkCardFull from './talk-card-full';

type Props = {
	talks: Talk[]
};

export default function RoomSchedule({ talks }: Props) {
	const { query } = useRouter();
	return (
		<div className={styles.container}>
			<Header hero={`Sala ${query.slug}`} description="Confira a programação e aproveite!" />
			{talks.map(t => (
				<TalkCardFull talk={t} />
			))}
		</div>
	);
}