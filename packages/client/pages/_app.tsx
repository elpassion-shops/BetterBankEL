import { AppProps } from 'next/app';
import Head from 'next/head';
import config from '../config';
import '../styles/tailwind.css';
import { SessionProvider } from 'next-auth/react';

if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
  import('../mocks').then(({ setupMocks }) => setupMocks());
}

function CustomApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <>
      <Head>
        <title>{config.appName}</title>
        <link rel="icon" type="image/svg+xml" href="data:image/x-icon;" />
      </Head>

      <div className="dark:text-white">
        <SessionProvider session={session}>
          <Component {...pageProps} />
        </SessionProvider>
      </div>
    </>
  );
}

export default CustomApp;
