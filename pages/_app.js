import NavBar from '../components/NavBar'
// import { UserProvider } from '@auth0/nextjs-auth0';

import '../styles/app.css';

function MyApp({ Component, pageProps }) {
  return (
    // <UserProvider>
      <div className="bg-blue-600 w-full p-10 min-h-screen">
        <div className="max-w-2xl mx-auto">
          <NavBar>
            <Component {...pageProps} />
          </NavBar>
        </div>
      </div>
    // </UserProvider>
  );
}

export default MyApp;
