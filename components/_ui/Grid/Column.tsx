import { ReactNode } from 'react';
import cn from 'classnames';

import styles from './Grid.module.scss';

type Props = {
  lg: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  sm?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  xsm?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  smOrder?: 1 | 2 | 3;
  xsmOrder?: 1 | 2 | 3;
  children?: ReactNode;
  className?: string;
};

export default function Column(props: Props) {
  const { lg, sm = 12, xsm = 12, smOrder, xsmOrder, children, className } = props;

  return (
    <div
      className={cn(
        styles.column,
        styles[`col-xsm-${xsm}`],
        styles[`col-sm-${sm}`],
        styles[`col-lg-${lg}`],
        className,
        {
          [styles[`order-xsm-${xsmOrder}`]]: xsmOrder,
          [styles[`order-sm-${smOrder}`]]: smOrder
        }
      )}
    >
      {children}
    </div>
  );
}
