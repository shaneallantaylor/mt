import Head from 'next/head';
import NProgress from 'nprogress';
import Router from 'next/router';
import { ApolloProvider } from '@apollo/client';
import Layout from '../components/Layout';

import withData from '../lib/withData';
import '../styles/nprogress.css';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({ Component, pageProps, apollo }) {
  return (
    <ApolloProvider client={apollo}>
      <Layout>
        <Head>
          <title>Next.js + MongoDB App</title>
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;700&display=optional"
            rel="stylesheet"
          />
        </Head>
        <Component {...pageProps} />
      </Layout>
    </ApolloProvider>
  );
}

MyApp.getInitialProps = async function ({ Component, ctx }) {
  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  pageProps.query = ctx.query;

  return { pageProps };
};

export default withData(MyApp);
