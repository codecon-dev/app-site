import cn from 'classnames';

import { Sponsor } from '@lib/types';
import Navbar from '@components/_ui/Navbar';
import Footer from '@components/_ui/Footer';

import styles from './Layout.module.scss';

type Props = {
  children: React.ReactNode;
  hideNav?: boolean;
  sponsors?: Sponsor[];
  hideFooter?: boolean;
};

export default function Layout({ children, hideNav, sponsors, hideFooter }: Props) {
  return (
    <>
      {!hideNav && <Navbar />}
      <main className={cn(styles.main)}>{children}</main>
      {!hideFooter && <Footer sponsors={sponsors} />}
    </>
  );
}
