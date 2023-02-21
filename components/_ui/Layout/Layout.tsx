import cn from 'classnames';

import { Sponsor } from '@lib/types/all';
import Navbar from '@components/_ui/Navbar';
import Footer from '@components/_ui/Footer';
import WhatsappFloatingButton from '@components/_ui/WhatsappFloatingButton';

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
            {!hideNav && <Navbar />}
            <main className={cn(styles.main)}>{children}</main>
            {(!hideNav || !hideFooter) && <WhatsappFloatingButton />}
            {!hideFooter && <Footer sponsors={sponsors} />}
        </>
    );
}
