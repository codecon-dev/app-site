import clsx from 'clsx';
import { ReactNode } from 'react';

import styles from './Grid.module.scss';

type Props = {
  align?: 'start' | 'center' | 'end';
  children: ReactNode;
  className?: string;
};

export default function Grid(props: Props) {
  const { children, align = 'start', className } = props;

  const aditionalClasses = {
    [styles[`grid--align-start`]]: align === 'start',
    [styles['grid--align-center']]: align === 'center',
    [styles['grid--align-end']]: align === 'end'
  };

  return <div className={clsx(styles.grid, aditionalClasses, className)}>{children}</div>;
}
