import Link from 'next/link';
import { useRouter, NextRouter } from 'next/router';
import cn from 'classnames';

import { MenuItem } from '@lib/types/all';
import Logo from '@components/_ui/Icons/icon-logo';
import MobileMenu from '../MobileMenu';

import styles from './Navbar.module.scss';

export type Props = {
    navigation: MenuItem[];
    secondNavigation: MenuItem[];
};

export default function Navbar({ navigation, secondNavigation }: Props) {
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
                        {/*<MobileMenu
                            key={router.asPath}
                            navigation={navigation}
                            secondNavigation={secondNavigation}
                        />*/}
                    </div>
                    <div className={styles['header__navigation']}>
                        <nav className={styles['nav']}>
                            {navigation.map(({ name, route }) => (
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
                            {secondNavigation.map(({ name, route, type, target }) => (
                                <Link key={name} href={route}>
                                    <a
                                        target={target == '_blank' ? '_blank' : undefined}
                                        rel={target == '_blank' ? 'noopener noreferrer' : undefined}
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
