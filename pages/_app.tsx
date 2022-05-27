import type { AppProps } from 'next/app';
import { SSRProvider, OverlayProvider } from 'react-aria';

import NProgress from '@components/_ui/Utils/NProgress';
import ResizeHandler from '@components/_ui/Utils/ResizeHandler';

import '@styles/global.css';
import '@styles/nprogress.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SSRProvider>
      <OverlayProvider>
        <Component {...pageProps} />
        <ResizeHandler />
        <NProgress />
      </OverlayProvider>
    </SSRProvider>
  );
}
