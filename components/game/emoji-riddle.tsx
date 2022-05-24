import emoji from "react-easy-emoji"
import styles from "./emoji-riddle.module.css"

export default function EmojiRiddle({question, hint}: Props) {
    return (
        <>
            <div className={styles.hint}>
                <span>{emoji(`${hint}`)}</span>
            </div>
            <h2>{question}</h2>
        </>
    )
}

export type Props = {
    id?: number,
    question?: string,
    hint?: string
}