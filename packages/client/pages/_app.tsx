import { AppProps } from 'next/app';
import Head from 'next/head';
import config from '../config';
import '../styles/tailwind.css';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>{config.appName}</title>
        <link rel="icon" type="image/svg+xml" href="data:image/x-icon;" />
      </Head>

      <Component {...pageProps} />
    </>
  );
}

export default CustomApp;
