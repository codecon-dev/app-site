import Link from 'next/link';
import { useRouter, NextRouter } from 'next/router';
import cn from 'classnames';

import {
    DIGITAL_MENU_NAV,
    DIGITAL_ATTENDEE_NAV,
    SUMMIT_MENU_NAV,
    SUMMIT_ATTENDEE_NAV,
    FEATURE_MENU_NAV,
    FEATURE_ATTENDEE_NAV
} from '@lib/constants';
import Logo from '@components/_ui/Icons/icon-logo';
import MobileMenu from '@components/_ui/MobileMenu';

import styles from './Navbar.module.scss';

type Props = {
    theme: 'digital' | 'summit' | 'feature';
};

export default function Navbar({ theme }: Props) {
    const router: NextRouter = useRouter();
    const activeRoute: string = router.asPath;
    let MENU_NAV;
    let ATTENDEE_NAV;

    switch (theme) {
        case 'digital':
            MENU_NAV = DIGITAL_MENU_NAV;
            ATTENDEE_NAV = DIGITAL_ATTENDEE_NAV;
            break;
        case 'summit':
            MENU_NAV = SUMMIT_MENU_NAV;
            ATTENDEE_NAV = SUMMIT_ATTENDEE_NAV;
            break;
        case 'feature':
            MENU_NAV = FEATURE_MENU_NAV;
            ATTENDEE_NAV = FEATURE_ATTENDEE_NAV;
            break;
    }

    return (
        <>
            <header className={cn(styles.header, `theme-${theme}`)}>
                <div className={cn('container', styles['header__container'])}>
                    <div className={styles['header__logo']}>
                        <Link href="/">
                            <a className={styles.logo}>
                                <Logo theme={theme} />
                            </a>
                        </Link>
                        <MobileMenu key={router.asPath} />
                    </div>
                    <div className={styles['header__navigation']}>
                        <nav className={styles['nav']}>
                            {MENU_NAV.map(({ name, route }) => (
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
                            {ATTENDEE_NAV.map(({ name, route, type }) => (
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
