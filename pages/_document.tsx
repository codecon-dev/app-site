/* eslint-disable @next/next/next-script-for-ga */
import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class CustomDocument extends Document {
    renderGTMSnippet() {
        return (
            <script
                dangerouslySetInnerHTML={{
                    __html: `
                      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                      })(window,document,'script','dataLayer', 'GTM-M5P4JW8');
                    `
                }}
            />
        );
    }

    renderGTMNoScript() {
        return (
            <noscript
                dangerouslySetInnerHTML={{
                    __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-M5P4JW8" height="0" width="0" style="display:none;visibility:hidden"></iframe>`
                }}
            />
        );
    }

    render() {
        return (
            <Html lang="pt-BR">
                <Head>{this.renderGTMSnippet()}</Head>
                <body>
                    {this.renderGTMNoScript()}
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}
