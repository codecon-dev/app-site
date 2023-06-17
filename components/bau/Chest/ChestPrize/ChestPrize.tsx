import cn from 'classnames';
import styles from './ChestPrize.module.scss';

type Props = {
    show: boolean;
    prize: string | null;
    firstOpen: boolean;
};

export default function ChestPrize({ show, prize, firstOpen }: Props) {
    return (
        <div
            className={cn(styles.chestPrize, {
                [styles.show]: show
            })}
        >
            <h2 className={styles.heading}>
                {firstOpen ? 'Você ganhou...' : 'Você já abriu e ganhou...'}
            </h2>
            <div className={styles.prize}>{prize}</div>
        </div>
    );
}
