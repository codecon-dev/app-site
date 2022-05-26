import Document, { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';

export default class CustomDocument extends Document {
  renderGTMSnippet() {
    return (
      <>
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-VMX8ZXD3J0" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
        
          gtag('config', 'G-VMX8ZXD3J0');
        `
          }}
        />
      </>
    );
  }

  render() {
    return (
      <Html lang="pt-BR">
        <Head>{this.renderGTMSnippet()}</Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
