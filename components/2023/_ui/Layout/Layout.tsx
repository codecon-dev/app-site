import cn from 'classnames';
import useBlobity from 'blobity/lib/react/useBlobity';

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
    const blobity = useBlobity({
        licenseKey: 'opensource',
        color: 'rgb(0, 0, 0)',
        magnetic: false,
        zIndex: 200,
        size: 100,
        invert: true,
        focusableElements: undefined
    });

    return (
        <div className={styles.wrapper}>
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
        </div>
    );
}
