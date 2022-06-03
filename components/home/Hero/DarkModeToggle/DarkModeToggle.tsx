import { useState } from 'react';

import styles from './DarkModeToggle.module.scss';

export default function DarkModeToggle() {
  const [text, setText] = useState('dark mode');
  const possibleTexts = [
    'dark mode',
    'outro dark mode',
    'só tem esse mesmo',
    'dark mode escuro',
    'modo escuro'
  ];

  const handleChange = () => {
    setText(possibleTexts[Math.floor(Math.random() * possibleTexts.length)]);
  };

  return (
    <div className={styles.wrapper}>
      <label htmlFor="darkModeToggle" className={styles['toggle']}>
        <input
          onChange={handleChange}
          className={styles['toggle__input']}
          type="checkbox"
          id="darkModeToggle"
        />
        <span className={styles['toggle__fill']} />
      </label>
      <span>{text}</span>
    </div>
  );
}
