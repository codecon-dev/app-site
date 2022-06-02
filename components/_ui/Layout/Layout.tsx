import { useRouter, NextRouter } from 'next/router';
import cn from 'classnames';

import { Sponsor } from '@lib/types';
import Navbar from '@components/_ui/Navbar';
import Footer from '@components/_ui/Footer';

import styles from './Layout.module.scss';

type Props = {
  children: React.ReactNode;
  className?: string;
  hideNav?: boolean;
  layoutStyles?: any;
  sponsors?: Sponsor[];
  hideFooter?: boolean;
  paddingBottom?: boolean;
};

export default function Layout({
  children,
  className,
  hideNav,
  layoutStyles,
  sponsors,
  hideFooter = false,
  paddingBottom
}: Props) {
  const router: NextRouter = useRouter();
  const activeRoute: string = router.asPath;

  return (
    <>
      <div className={cn(styles.background, styles.backgroundGrid)}>
        {!hideNav && <Navbar />}
        <div className={styles.page}>
          <main
            className={cn(styles.main, { [styles.paddingBottom]: paddingBottom })}
            style={layoutStyles}
          >
            <div className={cn(styles.full, className)}>{children}</div>
          </main>
          <Footer hideFooter={hideFooter} sponsors={sponsors} />
        </div>
      </div>
    </>
  );
}
