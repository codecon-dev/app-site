import { Toaster } from 'react-hot-toast';
import cn from 'classnames';
import Head from 'next/head';
import { useRouter } from 'next/router';

import ThemeContext, { ThemeContextType } from 'context/ThemeContext';
import { Sponsor } from '@lib/types/all';
import Navbar from '@components/_ui/Navbar';
import Footer from '@components/_ui/Footer';
import WhatsappFloatingButton from '@components/_ui/WhatsappFloatingButton';

import { SITE_URL, TWITTER_USER_NAME, getEventData } from '@lib/constants';
import styles from './Page.module.scss';

type Meta = {
    title: string;
    description?: string;
    image?: string;
    url?: string;
};

type Props = {
    meta?: Meta;
    children: React.ReactNode;
    theme: ThemeContextType;
    hideNav?: boolean;
    hideFooter?: boolean;
    sponsors?: Sponsor[];
};

export default function Page({ meta, children, theme, hideNav, hideFooter, sponsors }: Props) {
    const eventData = getEventData(theme);
    const router = useRouter();
    const image = meta?.image || eventData.shareImage;
    const title = meta?.title || eventData.siteName;
    const url = meta?.url || `${eventData.homeUrl}${router.asPath}`;
    const description = meta?.description || eventData.metaDescription;

    return (
        <ThemeContext.Provider value={theme}>
            <div className={cn(styles.page, `theme-${theme}`)}>
                <Head>
                    <title>{title}</title>
                    <meta property="og:title" content={title} />
                    <meta property="og:url" content={url} />
                    <meta name="description" content={description} />
                    <meta property="og:description" content={description} />
                    <meta name="twitter:site" content={`@${TWITTER_USER_NAME}`} />
                    <meta name="twitter:card" content={image ? 'summary_large_image' : 'summary'} />
                    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                    <link rel="manifest" href="/site.webmanifest" />
                    <link rel="shortcut icon" href="/favicon.ico" />
                    {image && (
                        <meta
                            property="og:image"
                            content={image.startsWith('https://') ? image : `${SITE_URL}${image}`}
                        />
                    )}

                    <style type="text/css">
                        {`
                        :root {
                            --color-primary: ${eventData.colors.primary};
                            --color-primary-dark: ${eventData.colors.primaryDark};
                            --color-background: ${eventData.colors.background};
                        }
                    `}
                    </style>
                </Head>
                <Toaster />
                {!hideNav && <Navbar />}
                <main>{children}</main>
                {(!hideNav || !hideFooter) && <WhatsappFloatingButton />}
                {!hideFooter && <Footer sponsors={sponsors} />}
            </div>
        </ThemeContext.Provider>
    );
}
