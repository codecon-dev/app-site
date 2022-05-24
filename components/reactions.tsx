import { useState, useEffect } from 'react';
import cn from 'classnames';
import styleUtils from './utils.module.css';
import styles from './reactions.module.css';
import { getReactions } from '@lib/user-api';
import ReactionButton from './reaction-button';
import ReactionNew from './reaction-new';
import { useReactionOrder } from '@lib/hooks/use-reaction-order'

type Reactions = {
  thumbsUp: number,
  happy: number,
  party: number,
  neutral: number,
  heart: number,
  rocket: number
};

const DEFAULT_REACTIONS = {
  thumbsUp: 0,
  happy: 0,
  party: 0,
  neutral: 0,
  heart: 0,
  rocket: 0
}

export default function Reactions( { id = '', externalStyles, background = false }: { id: string, externalStyles?: string, background?: boolean } ) {
  const [reactions, setReactions] = useState<Reactions>(DEFAULT_REACTIONS);
  const [reactionOrder, setReactionOrder] = useState<string>('')
  const [reactionCodeUnlocked, setReactionCodeUnlocked] = useState<boolean>(false)
  const [sameUserVotesUnlocked, setSameUserVotesUnlocked] = useState<boolean>(false)
  
  const reactionOrderSuccess = useReactionOrder(reactionOrder)
  if(reactionOrderSuccess && !reactionCodeUnlocked) {
    setReactionCodeUnlocked(true)
  }

  const classes = externalStyles ? [externalStyles, styles.reactions] : [styleUtils.appear, styleUtils['appear-sixth'], styles.reactions];

  async function getPageReactions() {
    const res = await getReactions({ id });
    const data = res.headers.get('Content-Type')?.includes('application/json')
    ? await res.json()
    : DEFAULT_REACTIONS;

    if (!res.ok) {
        return;
    }
    setReactions(data);
  }

  useEffect(() => {
    void getPageReactions();
  }, []);

  return (
    <>
    <div className={cn(classes)}>
        <ReactionButton onSameUserVotes={() => setSameUserVotesUnlocked(true)} name='thumbsUp' total={reactions.thumbsUp} id={id} background={background} setReactionOrder={setReactionOrder}/>
        <ReactionButton onSameUserVotes={() => setSameUserVotesUnlocked(true)} name='happy' total={reactions.happy} id={id} background={background} setReactionOrder={setReactionOrder} />
        <ReactionButton onSameUserVotes={() => setSameUserVotesUnlocked(true)} name='party' total={reactions.party} id={id} background={background} setReactionOrder={setReactionOrder} />
        <ReactionButton onSameUserVotes={() => setSameUserVotesUnlocked(true)} name='neutral' total={reactions.neutral} id={id} background={background} setReactionOrder={setReactionOrder} />
        <ReactionButton onSameUserVotes={() => setSameUserVotesUnlocked(true)} name='heart' total={reactions.heart} id={id} background={background} setReactionOrder={setReactionOrder} />
        <ReactionButton onSameUserVotes={() => setSameUserVotesUnlocked(true)} name='rocket' total={reactions.rocket} id={id} background={background} setReactionOrder={setReactionOrder} />
        <ReactionNew onUpdate={getPageReactions} id={id} background={background} />
    </div>
    </>
  );
}
