import { ReactNode } from 'react';
import clsx from 'clsx';

import styles from './Grid.module.scss';

type Props = {
  lg: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  sm?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  xsm?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  smOrder?: 1 | 2 | 3;
  xsmOrder?: 1 | 2 | 3;
  children: ReactNode;
  className?: string;
};

export default function Column(props: Props) {
  const { lg, sm = 12, xsm = 12, smOrder, xsmOrder, children, className } = props;

  return (
    <div
      className={clsx(
        styles.column,
        styles['col-xsm-' + xsm],
        styles['col-sm-' + sm],
        styles['col-lg-' + lg],
        className,
        {
          [styles['order-xsm-' + xsmOrder]]: xsmOrder,
          [styles['order-sm-' + smOrder]]: xsmOrder
        }
      )}
    >
      {children}
    </div>
  );
}
