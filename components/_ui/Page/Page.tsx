import { Toaster } from 'react-hot-toast';
import cn from 'classnames';
import Head from 'next/head';
import { useRouter } from 'next/router';

import ThemeContext, { ThemeContextType } from 'context/ThemeContext';
import { Sponsor } from '@lib/types/all';
import Navbar from '@components/_ui/Navbar';
import Footer from '@components/_ui/Footer';
import WhatsappFloatingButton from '@components/_ui/WhatsappFloatingButton';
import SubscribeCountdown from '@components/_ui/SubscribeCountdown';

import { SITE_URL, TWITTER_USER_NAME, useEventData } from '@lib/constants';
import styles from './Page.module.scss';

export type Meta = {
    title: string;
    description?: string;
    image?: string;
    url?: string;
};

type Props = {
    meta?: Meta;
    children: React.ReactNode;
    theme?: ThemeContextType;
    live?: boolean;
    hideNav?: boolean;
    hideNavMenu?: boolean;
    hideFooter?: boolean;
    hideWhatsApp?: boolean;
    noPadding?: boolean;
    sponsors?: Sponsor[];
};

export default function Page({
    meta,
    children,
    theme,
    live,
    hideNav,
    hideFooter,
    hideWhatsApp,
    noPadding,
    sponsors,
    hideNavMenu = false
}: Props) {
    const eventData = useEventData(theme);
    const router = useRouter();
    const image = meta?.image || eventData.shareImage;
    const title = meta?.title || eventData.siteName;
    const url = meta?.url || `${SITE_URL}${eventData.homeUrl}${router.asPath}`;
    const description = meta?.description || eventData.metaDescription;
    const imageBaseUrl =
        process.env.VERCEL_ENV === 'development' ? 'http://localhost:3000' : SITE_URL;

    return (
        <ThemeContext.Provider value={theme}>
            <div
                className={cn(styles.page, `theme-${theme}`, { [styles['no-padding']]: noPadding })}
            >
                <Head>
                    <title>{title}</title>
                    <meta property="og:title" content={title} />
                    <meta property="og:url" content={url} />
                    <meta name="description" content={description} />
                    <meta property="og:description" content={description} />
                    <meta name="twitter:site" content={`@${TWITTER_USER_NAME}`} />
                    <meta name="twitter:card" content={image ? 'summary_large_image' : 'summary'} />
                    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                    <link rel="icon" type="image/png" href="/favicon-32x32.png" />
                    <link rel="manifest" href="/site.webmanifest" />
                    {image && (
                        <meta
                            property="og:image"
                            content={
                                image.startsWith('https://') ? image : `${imageBaseUrl}${image}`
                            }
                        />
                    )}

                    <style type="text/css">
                        {`
                        :root {
                            --color-primary: ${eventData.colors.primary};
                            --color-primary-dark: ${eventData.colors.primaryDark};
                            --color-background: ${eventData.colors.background};
                            --heading-font-face: '${eventData.heading.fontFace}', sans-serif;
                            --heading-text-transform: ${eventData.heading.textTransform};
                        }
                    `}
                    </style>
                </Head>
                <Toaster />
                {!hideNav && <Navbar live={live} hideNavMenu={hideNavMenu} />}
                <main>{children}</main>
                {!hideFooter && <SubscribeCountdown eventData={eventData} />}
                {!hideFooter && <Footer sponsors={sponsors} />}
            </div>
        </ThemeContext.Provider>
    );
}
