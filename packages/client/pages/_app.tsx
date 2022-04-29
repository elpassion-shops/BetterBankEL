import { AppProps } from 'next/app';
import Head from 'next/head';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import config from '../config';
import '../styles/tailwind.css';
import { SessionProvider } from 'next-auth/react';
import Layout from '../components/Layout';

if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
  const { setupMocks } = require('../mocks');
  setupMocks();
}

const queryClient = new QueryClient();

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
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false} />

          <SessionProvider session={session}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </SessionProvider>
        </QueryClientProvider>
      </div>
    </>
  );
}

export default CustomApp;
