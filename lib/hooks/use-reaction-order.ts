import { useEffect, useState } from "react";


const reactionsOrder = [ 'happy', 'heart', 'thumbsUp', 'rocket', 'party' ];

export const useReactionOrder = (reactionOrder: string) => {
  const [count, setCount] = useState(0);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!reactionOrder) return;
    if (reactionOrder !== reactionsOrder[count]) {
      setCount(0);
      return;
    }

    setCount((state) => state + 1);
    if (count + 1 === reactionsOrder.length) {
      setSuccess(true);
    }
  }, [reactionOrder]);

  return success;
}; 