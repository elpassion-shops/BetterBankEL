import NextDocument, { Html, Head, Main, NextScript } from 'next/document';

export default class Document extends NextDocument {
  render() {
    return (
      <Html lang="en" className="">
        <Head />
        <body className="dark:bg-slate-800">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
