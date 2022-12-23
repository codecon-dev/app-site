import Link from 'next/link';
import { useRouter, NextRouter } from 'next/router';
import cn from 'classnames';

import { ATTENDEE_NAVIGATION_2022, NAVIGATION_2022 } from '@lib/constants';
import Logo from '@components/2022/_ui/Icons/icon-logo';
import MobileMenu from '@components/2022/_ui/MobileMenu';

import styles from './Navbar.module.scss';

export default function Navbar() {
    const router: NextRouter = useRouter();
    const activeRoute: string = router.asPath;

    return (
        <>
            <header className={cn(styles.header)}>
                <div className={cn('container', styles['header__container'])}>
                    <div className={styles['header__logo']}>
                        <Link href="/2022">
                            <a className={styles.logo}>
                                <Logo />
                            </a>
                        </Link>
                        <MobileMenu key={router.asPath} />
                    </div>
                    <div className={styles['header__navigation']}>
                        <nav className={styles['nav']}>
                            {NAVIGATION_2022.map(({ name, route }) => (
                                <Link key={name} href={route}>
                                    <a
                                        className={cn(styles['nav__item'], {
                                            [styles['nav__item--active']]:
                                                activeRoute.startsWith(route)
                                        })}
                                    >
                                        {name}
                                    </a>
                                </Link>
                            ))}
                        </nav>
                        <nav className={cn(styles['nav'], styles['nav--attendee'])}>
                            {ATTENDEE_NAVIGATION_2022.map(({ name, route, type }) => (
                                <Link key={name} href={route}>
                                    <a
                                        target={type == 'button' ? '_blank' : undefined}
                                        rel={type == 'button' ? 'noopener noreferrer' : undefined}
                                        className={cn(styles['nav__item'], {
                                            [styles['nav__item--active']]:
                                                activeRoute.startsWith(route),
                                            [styles['nav__item--button']]: type == 'button'
                                        })}
                                    >
                                        {name}
                                    </a>
                                </Link>
                            ))}
                        </nav>
                    </div>
                </div>
            </header>
        </>
    );
}
