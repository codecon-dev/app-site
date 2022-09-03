import styles from './DayOnePuzzle3.module.scss';
import PuzzleLayout from '../PuzzleLayout';
import Image from 'next/image';
import { useState } from 'react';

export default function DayOnePuzzle3() {
  let timer: ReturnType<typeof setTimeout>;
  const mugImage1 = '/images/enigmas/3-mug-1.png'
  const mugImage2 = '/images/enigmas/3-mug-2.png'
  const [mugImage, setMugImage] = useState(mugImage1);

  function handleMouseOver() {
      timer = setTimeout(() => {
        setMugImage(mugImage2);
      }, 2000);
  }

  function handleMouseOut() {
      setMugImage(mugImage1);
      clearTimeout(timer);
  }

  return (
    <PuzzleLayout bgStyle={styles.bg}>
      <div className={styles.container}>
        <div className={styles.book}>
          <Image src="/images/enigmas/3-book.png" layout='fill'/>
        </div>
        <div className={styles.mug}>
          <Image
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
            src={mugImage} 
            layout='fill'
          />
        </div>
      </div>
    </PuzzleLayout>
  );
}
