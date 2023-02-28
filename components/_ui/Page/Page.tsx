import { Toaster } from 'react-hot-toast';
import cn from 'classnames';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { Sponsor } from '@lib/types/all';
import Navbar from '@components/_ui/Navbar';
import Footer from '@components/_ui/Footer';
import WhatsappFloatingButton from '@components/_ui/WhatsappFloatingButton';

import { META_DESCRIPTION, SITE_NAME, SITE_URL, TWITTER_USER_NAME } from '@lib/constants';

type Meta = {
    title: string;
    description?: string;
    image?: string;
    url?: string;
};

type Props = {
    meta?: Meta;
    children: React.ReactNode;
    theme: 'digital' | 'summit' | 'feature';
    hideNav?: boolean;
    hideFooter?: boolean;
    sponsors?: Sponsor[];
};

export default function Page({
    meta,
    children,
    theme = 'digital',
    hideNav,
    hideFooter,
    sponsors
}: Props) {
    const router = useRouter();
    const image = meta?.image || '/share-image.png';
    const title = meta?.title || SITE_NAME;
    const url = meta?.url || `${SITE_URL}${router.asPath}`;
    const description = meta?.description || META_DESCRIPTION;

    return (
        <div className={cn('page-container', `theme-${theme}`)}>
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

                {theme == 'digital' && (
                    <style type="text/css">
                        {`
                            :root {
                                --color-primary: #45E27F;
                                --color-primary-dark: #006C68;
                                --color-background: #0E1116;
                            }
                        `}
                    </style>
                )}

                {theme == 'summit' && (
                    <style type="text/css">
                        {`
                            :root {
                                --color-primary: #8800FF;
                                --color-primary-dark: #280075;
                                --color-background: #120E16;
                            }
                        `}
                    </style>
                )}

                {theme == 'feature' && (
                    <style type="text/css">
                        {`
                            :root {
                                --color-primary: #0055FF;
                                --color-primary-dark: #001EA6;
                                --color-background: #0E1116;
                            }
                        `}
                    </style>
                )}
            </Head>
            <Toaster />
            {!hideNav && <Navbar theme={theme} />}
            <main>{children}</main>
            {(!hideNav || !hideFooter) && <WhatsappFloatingButton />}
            {!hideFooter && <Footer sponsors={sponsors} />}
        </div>
    );
}
