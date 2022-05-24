import cn from 'classnames';
import { useState, useEffect, useRef, ReactFragment } from 'react';
import styles from './reactions.module.css';
import { voteReaction } from '@lib/user-api';
import LoadingDots from './loading-dots';

type FormState = 'default' | 'loading' | 'error';

type Reactions = {
  thumbsUp: number,
  happy: number,
  party: number,
  neutral: number,
  heart: number,
  rocket: number
};

const DEFAULT_ERROR_MSG = 'Error! Please try again.';

const DEFAULT_REACTIONS = {
  thumbsUp: 0,
  happy: 0,
  party: 0,
  neutral: 0,
  heart: 0,
  rocket: 0
}


export default function ReactionNew( { id, onUpdate, background }: { id: string, onUpdate: Function, background: boolean }) {
  const [opened, setOpened] = useState(false);
  const [loading, setLoading] = useState(false);
  const node = useRef() as React.MutableRefObject<HTMLInputElement>;
  const classes = background ? [styles.background, styles['new-reaction-container']] : [styles['new-reaction-container']];
  
  const handleClick = (e: { target: any; }) => {
    const no = node.current || Object();

    if (no.contains(e.target)) {
      // inside click
      return;
    }
    // outside click 
    setOpened(false);
  };

  useEffect(() => {
    // add when mounted
    document.addEventListener("mousedown", handleClick);
    // return function to be called when unmounted
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  const voteFor = async (name: string) => {
    setOpened(false);

    try {
      setLoading(true);
      const res = await voteReaction({ id, name });

      if(res.ok) {
        onUpdate();
      }

      setLoading(false);
    } catch (err) {
        console.error(err);
        setLoading(false);
    }
  }

  return (
    <div ref={node} className={cn(classes)}>
      { opened 
        && (
          <div className={styles.modal}>
            <button onClick={() => voteFor('thumbsUp')}><img src='/thumbsUp.png' width="24" height="24" alt="Deixe uma reação"/></button>
            <button onClick={() => voteFor('happy')}><img src='/happy.png' width="24" height="24" alt="Deixe uma reação"/></button>
            <button onClick={() => voteFor('party')}><img src='/party.png' width="24" height="24" alt="Deixe uma reação"/></button>
            <button onClick={() => voteFor('neutral')}><img src='/neutral.png' width="24" height="24" alt="Deixe uma reação"/></button>
            <button onClick={() => voteFor('heart')}><img src='/heart.png' width="24" height="24" alt="Deixe uma reação"/></button>
            <button onClick={() => voteFor('rocket')}><img src='/rocket.png' width="24" height="24" alt="Deixe uma reação"/></button>
          </div>
        )
      }
      <button name="Nova reação" onClick={() => setOpened(!opened)} className={styles['new-reaction']}>
        { loading ? <LoadingDots size={4} /> : 
          (
            <svg width="27" height="25" viewBox="0 0 27 25" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16.8011 22.9974C15.3302 23.6421 13.7062 24 12 24C5.38318 24 0 18.6167 0 11.9999C0 5.383 5.38318 0 12 0C18.6168 0 24 5.383 24 11.9999C24 12.7758 23.926 13.5347 23.7847 14.2699C23.4155 14.155 23.031 14.0749 22.6351 14.0332C22.7609 13.3745 22.8267 12.6947 22.8267 11.9999C22.8267 6.03015 17.9698 1.1734 12 1.1734C6.03015 1.1734 1.17334 6.03015 1.17334 11.9999C1.17334 17.9698 6.03015 22.8267 12 22.8267C13.5334 22.8267 14.9937 22.5062 16.3168 21.9287C16.4437 22.3029 16.6064 22.6605 16.8011 22.9974Z" fill="#707070"/>
              <path d="M8.02283 11.4866C9.01282 11.2529 9.62598 10.2608 9.39221 9.27075C9.15857 8.2807 8.1665 7.66754 7.17639 7.90131C6.1864 8.13501 5.57324 9.12708 5.80701 10.1171C6.04065 11.1072 7.03271 11.7203 8.02283 11.4866Z" fill="#707070"/>
              <path d="M16.8231 11.4866C17.8131 11.2529 18.4263 10.2608 18.1925 9.27075C17.9589 8.2807 16.9668 7.66754 15.9767 7.90131C14.9867 8.13501 14.3735 9.12708 14.6073 10.1171C14.8409 11.1072 15.833 11.7203 16.8231 11.4866Z" fill="#707070"/>
              <path d="M12.0002 20.3762C13.5753 20.3762 15.027 19.6772 16.1888 18.5005C16.5054 17.2703 17.2023 16.1928 18.1466 15.4008L18.1675 15.3466C18.193 15.2798 18.2179 15.2126 18.2422 15.145C18.2908 15.0093 18.337 14.8717 18.3807 14.7324C18.5243 14.2752 18.0795 13.852 17.6268 14.0093C15.9663 14.5866 14.0468 14.917 12.0002 14.917C9.95361 14.917 8.03418 14.5866 6.37366 14.0093C5.92102 13.8519 5.4762 14.2752 5.61975 14.7324C6.65979 18.0461 9.12427 20.3762 12.0002 20.3762Z" fill="#707070"/>
              <path fillRule="evenodd" clipRule="evenodd" d="M27 20C27 22.7614 24.7615 25 22 25C19.2385 25 17 22.7614 17 20C17 17.2386 19.2385 15 22 15C24.7615 15 27 17.2386 27 20ZM22.5531 19.4755H24V20.4604H22.5531V22H21.4509V20.4604H20V19.4755H21.4509V18H22.5531V19.4755Z" fill="#707070"/>
            </svg>
          )
        }
      </button>
    </div>
  );
}
