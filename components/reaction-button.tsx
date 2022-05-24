import cn from 'classnames';
import { useCallback, useState, useEffect, Dispatch } from 'react';
import styleUtils from './utils.module.css';
import styles from './reactions.module.css';
import LoadingDots from './loading-dots';
import { voteReaction } from '@lib/user-api';

const DEFAULT_ERROR_MSG = 'Error! Please try again.';

type Props = {
    name: string;
    total: number; 
    id: string;
    background: boolean;
    setReactionOrder: Dispatch<string>;
    onSameUserVotes: Function;
  };

export default function ReactionButton( { name, total, id, background, setReactionOrder, onSameUserVotes }: Props) {
    const [votes, setVotes] = useState(0);
    const [sameUserVotes, setSameUserVotes] = useState(0);
    const [voted, setVoted] = useState(false);
    const classes = background ? [styles.background, styles.button] : [styles.button];

    useEffect(() => {
        if(!votes) {
            setVotes(total);
        }
    })

    const onClick = async () => {
        setReactionOrder(name)

        setSameUserVotes(state => state + 1)
        if (sameUserVotes === 10) {
            onSameUserVotes();
        }

        if (voted) {
            return;
        }

        setVoted(true);

        try {
            const upVote = votes + 1;

            const res = await voteReaction({ id, name });

            if(res.ok) {
                setVotes(upVote);
            }
        } catch (err) {
            console.error(err);
        }
    }

    if (!total) {
        return null
    }

    return (
        <button name={name} onClick={onClick} className={cn(classes)}>
            <img src={`/${name}.png`} width="24" height="24" alt="Deixe uma reação"/>
            <span>{votes}</span>
        </button>
    );
}
