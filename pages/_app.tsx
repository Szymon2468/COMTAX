import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import Nav from '../src/components/Nav/Nav';
import Footer from '../src/components/Footer/Footer';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Nav />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}

export default MyApp;
