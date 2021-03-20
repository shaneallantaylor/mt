import Document, { Html, NextScript, Head, Main } from 'next/document';

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en-US">
        <Head>{/* stuff */}</Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
