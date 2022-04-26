import { AppProps } from 'next/app';
import Head from 'next/head';
import config from '../config';
import '../styles/tailwind.css';

if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
  const { setupMocks } = require('../mocks');
  setupMocks();
}

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>{config.appName}</title>
        <link rel="icon" type="image/svg+xml" href="data:image/x-icon;" />
      </Head>

      <div className="dark:text-white">
        <Component {...pageProps} />
      </div>
    </>
  );
}

export default CustomApp;
