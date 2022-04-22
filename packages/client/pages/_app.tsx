import { AppProps } from 'next/app';
import Head from 'next/head';
import '../styles/tailwind.css';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>BetterBankEL</title>
        <link rel="icon" type="image/svg+xml" href="data:image/x-icon;" />
      </Head>

      <Component {...pageProps} />
    </>
  );
}

export default CustomApp;
