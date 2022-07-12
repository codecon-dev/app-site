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
    const nextTextIndex = possibleTexts.indexOf(text);
    const nextText = possibleTexts[nextTextIndex + 1] || possibleTexts[0];
    setText(nextText);
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
