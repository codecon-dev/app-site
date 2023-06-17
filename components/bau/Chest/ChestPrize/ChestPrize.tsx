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
            <h3 className={styles.heading}>
                {firstOpen ? 'Você ganhou...' : 'Você já abriu e ganhou...'}
            </h3>
            <div className={styles.prize}>{prize}</div>
        </div>
    );
}
