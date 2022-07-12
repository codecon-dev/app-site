import { useState } from 'react';

import styles from './DarkModeToggle.module.scss';

export default function DarkModeToggle() {
  const [text, setText] = useState('dark mode');
  const texts = [
    'dark mode',
    'outro dark mode',
    'só tem esse mesmo',
    'dark mode escuro',
    'modo escuro'
  ];

  const handleChange = () => {
    const textIndex = texts.indexOf(text);
    const nextText = texts[textIndex + 1] || texts[0];
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
