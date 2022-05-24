import React from 'react';
import Link from 'next/link';
import cn from 'classnames';

import styles from './Button.module.css';

type Props = {
  children: React.ReactNode;
  href: string;
  type?: 'primary' | 'secondary' | 'tertiary';
  block?: boolean;
  newPage?: boolean;
};

export default function Button({ children, type, href, block, newPage }: Props) {
  return (
    <Link href={href}>
      <a
        target={newPage ? '_blank' : undefined}
        rel={newPage ? 'noopener noreferrer' : undefined}
        className={cn(styles.button, {
          [styles.primary]: type === 'primary',
          [styles.secondary]: type === 'secondary',
          [styles.tertiary]: type === 'tertiary',
          [styles.block]: block
        })}
      >
        {children}
      </a>
    </Link>
  );
}
