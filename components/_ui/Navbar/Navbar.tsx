import Link from 'next/link';
import { useRouter, NextRouter } from 'next/router';
import cn from 'classnames';

import { ATTENDEE_NAVIGATION, NAVIGATION } from '@lib/constants';
import { Sponsor } from '@lib/types';
import Logo from '@components/_ui/Icons/icon-logo';
import MobileMenu from '@components/_ui/MobileMenu';

import styles from './Navbar.module.scss';

type Props = {
  children: React.ReactNode;
  className?: string;
  hideNav?: boolean;
  layoutStyles?: any;
  sponsors?: Sponsor[];
  hideFooter?: boolean;
  paddingBottom?: boolean;
};

export default function Layout() {
  const router: NextRouter = useRouter();
  const activeRoute: string = router.asPath;

  return (
    <>
      <header className={cn(styles.header)}>
        <div className={cn('container', styles['header--container'])}>
          <div className={styles['header--logo']}>
            <Link href="/">
              <a className={styles.logo}>
                <Logo />
              </a>
            </Link>
            <MobileMenu key={router.asPath} />
          </div>
          <nav className={styles['nav']}>
            {NAVIGATION.map(({ name, route }) => (
              <Link key={name} href={route}>
                <a
                  className={cn(styles['nav--item'], {
                    [styles['nav--item__active']]: activeRoute.startsWith(route)
                  })}
                >
                  {name}
                </a>
              </Link>
            ))}
          </nav>
          <nav className={cn(styles['nav'], styles['nav__attendee'])}>
            {ATTENDEE_NAVIGATION.map(({ name, route, type }) => (
              <Link key={name} href={route}>
                <a
                  className={cn(styles['nav--item'], {
                    [styles['nav--item__active']]: activeRoute.startsWith(route),
                    [styles['nav--item__button']]: type == 'button'
                  })}
                >
                  {name}
                </a>
              </Link>
            ))}
          </nav>
        </div>
      </header>
    </>
  );
}
