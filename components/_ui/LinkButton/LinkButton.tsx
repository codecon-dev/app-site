import React from 'react';
import Link from 'next/link';
import cn from 'classnames';

import styles from './LinkButton.module.scss';

export type Props = {
  children: React.ReactNode;
  href: string;
  type?: 'primary' | 'secondary';
  info?: number | string;
  newPage?: boolean;
  disabled?: boolean;
  block?: boolean;
};

export default function Button({ children, href, type, info, newPage, disabled, block }: Props) {
  return (
    <Link href={disabled ? '#' : href}>
      <a
        target={newPage ? '_blank' : undefined}
        rel={newPage ? 'noopener noreferrer' : undefined}
        className={cn(styles.button, styles[`button--${type}`], {
          [styles['button--with-info']]: info,
          [styles['button--disabled']]: disabled,
          [styles['button--block']]: block
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
