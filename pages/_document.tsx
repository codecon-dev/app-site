import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class CustomDocument extends Document {
  renderGTMSnippet() {
    return (
      <>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-VMX8ZXD3J0"></script>
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
