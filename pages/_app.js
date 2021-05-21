import Head from 'next/head';
import { UserProvider } from '@auth0/nextjs-auth0';
import NavBar from '../components/NavBar';

import '../styles/app.css';

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <div className="bg-blue-600 w-full p-10 min-h-screen">
        <div className="max-w-2xl mx-auto">
          <Head>
            <title>MHC 1st Nextjs App</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <NavBar />
          <Component {...pageProps} />
        </div>
      </div>
    </UserProvider>
  );
}

export default MyApp;
