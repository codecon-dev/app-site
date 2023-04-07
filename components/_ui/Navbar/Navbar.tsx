import { useContext, useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, NextRouter } from 'next/router';
import cn from 'classnames';

import ThemeContext from 'context/ThemeContext';
import { getEventData } from '@lib/constants';
import Logo from '@components/_ui/Icons/icon-logo';
import MobileMenu from '@components/_ui/MobileMenu';

import styles from './Navbar.module.scss';

export default function Navbar({ hideNavMenu }: { hideNavMenu: boolean }) {
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
                        <Link href={eventData.homeUrl}>
                            <span className={styles.logo}>
                                <Logo theme={theme} />
                            </span>
                        </Link>
                        <MobileMenu key={router.asPath} />
                    </div>
                    <div className={styles['header__navigation']}>
                        {!hideNavMenu && (
                            <>
                                <nav className={styles['nav']}>
                                    {eventData.menuNav.map(({ name, route }) => (
                                        <Link key={name} href={route}>
                                            <span
                                                className={cn(styles['nav__item'], {
                                                    [styles['nav__item--active']]:
                                                        activeRoute === route
                                                })}
                                            >
                                                {name}
                                            </span>
                                        </Link>
                                    ))}
                                </nav>
                            </>
                        )}
                        <nav className={cn(styles['nav'], styles['nav--attendee'])}>
                            {eventData.attendeeNav.map(({ name, route, type, target }) => (
                                <Link
                                    key={name}
                                    href={route}
                                    target={target}
                                    rel={type == 'button' ? 'noopener noreferrer' : undefined}
                                >
                                    <span
                                        className={cn(styles['nav__item'], {
                                            [styles['nav__item--active']]:
                                                activeRoute.startsWith(route),
                                            [styles['nav__item--button']]: type == 'button'
                                        })}
                                    >
                                        {name}
                                    </span>
                                </Link>
                            ))}
                        </nav>
                    </div>
                </div>
            </header>
        </>
    );
}
