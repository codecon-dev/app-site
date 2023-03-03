import { useContext, useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, NextRouter } from 'next/router';
import cn from 'classnames';

import ThemeContext from 'context/ThemeContext';
import { getEventData } from '@lib/constants';
import Logo from '@components/_ui/Icons/icon-logo';
import MobileMenu from '@components/_ui/MobileMenu';

import styles from './Navbar.module.scss';

export default function Navbar() {
    const theme = useContext(ThemeContext);
    const eventData = getEventData(theme);
    const router: NextRouter = useRouter();
    const activeRoute: string = router.asPath;

    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        window.addEventListener('scroll', () => {
            setIsScrolled(window.scrollY > 100);
        });
    }, []);

    return (
        <>
            <header className={cn(styles.header, { [styles.scroll]: isScrolled })}>
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
                            {eventData.menuNav.map(({ name, route }) => (
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
                            {eventData.attendeeNav.map(({ name, route, type }) => (
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
