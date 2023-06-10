import cn from "classnames"
import styles from "./ChestPrize.module.scss"

type Props = {
    show: boolean
    prize: string | null
}

export default function ChestPrize(props: Props) {
    return (
        <div className={cn(
            styles.chestPrize,
            {
                [styles.show]: props.show
            }
        )}>
            <h2 className={styles.heading}>Você ganhou...</h2>
            <div className={styles.prize}>{props.prize}</div>
        </div>
    )
}