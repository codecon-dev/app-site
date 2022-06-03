import React from 'react';
import Link from 'next/link';
import cn from 'classnames';

import styles from './Button.module.scss';

type Props = {
  children: React.ReactNode;
  href: string;
  price?: number;
  newPage?: boolean;
};

export default function Button({ children, href, price, newPage }: Props) {
  return (
    <Link href={href}>
      <a
        target={newPage ? '_blank' : undefined}
        rel={newPage ? 'noopener noreferrer' : undefined}
        className={cn(styles.button, {
          [styles['button--with-price']]: price
        })}
      >
        <span>{children}</span>
        {price && (
          <i className={styles['button__price']}>
            <span>R$ {price}</span>
          </i>
        )}
      </a>
    </Link>
  );
}
