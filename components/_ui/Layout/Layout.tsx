import cn from 'classnames';

import { Sponsor } from '@lib/types/all';
import Navbar from '@components/_ui/Navbar';
import Footer from '@components/_ui/Footer';

import styles from './Layout.module.scss';

type Props = {
  children: React.ReactNode;
  hideNav?: boolean;
  sponsors?: Sponsor[];
  hideSponsors?: boolean;
};

export default function Layout({ children, hideNav, sponsors, hideSponsors }: Props) {
  return (
    <>
      {!hideNav && <Navbar />}
      <main className={cn(styles.main)}>{children}</main>
      <Footer sponsors={sponsors} hideSponsors={hideSponsors} />
    </>
  );
}
