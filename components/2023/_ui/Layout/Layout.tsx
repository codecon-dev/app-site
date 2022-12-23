import cn from 'classnames';

import { Sponsor } from '@lib/types/all';
import Navbar from '../Navbar';
import Footer from '../Footer';

import styles from './Layout.module.scss';

type Props = {
    children: React.ReactNode;
    hideNav?: boolean;
    hideFooter?: boolean;
    sponsors?: Sponsor[];
};

export default function Layout({ children, hideNav, hideFooter, sponsors }: Props) {
    return (
        <>
            {!hideNav && (
                <Navbar
                    navigation={[]}
                    secondNavigation={[
                        { name: 'Fale com a gente', route: '/#contato', type: 'button' }
                    ]}
                />
            )}
            <main className={cn(styles.main)}>{children}</main>
            {!hideFooter && <Footer sponsors={sponsors} />}
        </>
    );
}
