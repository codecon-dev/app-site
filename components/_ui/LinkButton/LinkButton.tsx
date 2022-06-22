import React from 'react';
import Link from 'next/link';
import cn from 'classnames';

import styles from './LinkButton.module.scss';

export type Props = {
  children: React.ReactNode;
  href: string;
  info?: number | string;
  newPage?: boolean;
  disabled?: boolean;
};

export default function Button({ children, href, info, newPage, disabled }: Props) {
  return (
    <Link href={disabled ? '#' : href}>
      <a
        target={newPage ? '_blank' : undefined}
        rel={newPage ? 'noopener noreferrer' : undefined}
        className={cn(styles.button, {
          [styles['button--with-info']]: info,
          [styles['button--disabled']]: disabled
        })}
      >
        <span>{children}</span>
        {info && (
          <i className={styles['button__info']}>
            <span>{typeof info == 'number' ? `R$ ${info}` : info}</span>
          </i>
        )}
      </a>
    </Link>
  );
}
