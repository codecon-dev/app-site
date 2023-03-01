import Link from 'next/link';
import { useRouter, NextRouter } from 'next/router';
import cn from 'classnames';

import { getEventData } from '@lib/constants';
import Logo from '@components/_ui/Icons/icon-logo';
import MobileMenu from '@components/_ui/MobileMenu';

import styles from './Navbar.module.scss';

type Props = {
    theme: 'digital' | 'summit' | 'feature';
};

export default function Navbar({ theme }: Props) {
    const router: NextRouter = useRouter();
    const activeRoute: string = router.asPath;
    const eventData = getEventData(theme);

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
                        <MobileMenu key={router.asPath} theme={theme} />
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
