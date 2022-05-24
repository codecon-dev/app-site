/**
 * Copyright 2020 Vercel Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import Link from 'next/link';
import cn from 'classnames';
import { useRouter } from 'next/router';
import { SkipNavContent } from '@reach/skip-nav';
import { GATHER_URL, LIVE_ENABLED, NAVIGATION, SALES_ENABLED, SYMPLA_URL } from '@lib/constants';
import styles from './layout.module.css';
import Logo from './icons/icon-logo';
import MobileMenu from './mobile-menu';
import Footer from './footer';
import ViewSource from '@components/view-source';
import { Sponsor } from '@lib/types';

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
  const router = useRouter();
  const activeRoute = router.asPath;

  return (
    <>
      <div className={cn(styles.background, styles.backgroundGrid)}>
        {!hideNav && (
          <header className={cn(styles.header)}>
            <div className={styles.container}>
              <div className={styles['header-logos']}>
                <MobileMenu key={router.asPath} />
                <Link href="/">
                  <a className={styles.logo}>
                    <Logo />
                  </a>
                </Link>
              </div>
              <div className={styles['tabs-right']}>
                {NAVIGATION.map(({ name, route, target }) => (
                  <Link key={name} href={route}>
                    <a
                      className={cn(styles.tab, {
                        [styles['tab-active']]: activeRoute.startsWith(route)
                      })}
                      target={target}
                      rel={target === '_blank' ? 'noopener noreferrer' : undefined}
                    >
                      {name}
                      {target === '_blank' && (
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                          fillRule="evenodd"
                          clipRule="evenodd"
                        >
                          <path
                            fill="#fff"
                            d="M14 4h-13v18h20v-11h1v12h-22v-20h14v1zm10 5h-1v-6.293l-11.646 11.647-.708-.708 11.647-11.646h-6.293v-1h8v8z"
                          />
                        </svg>
                      )}
                    </a>
                  </Link>
                ))}
              </div>
            </div>
          </header>
        )}
        <div className={styles.page}>
          <main
            className={cn(styles.main, { [styles.paddingBottom]: paddingBottom })}
            style={layoutStyles}
          >
            <SkipNavContent />
            <div className={cn(styles.full, className)}>{children}</div>
          </main>
          <Footer hideFooter={hideFooter} sponsors={sponsors} />
        </div>
      </div>
    </>
  );
}
