import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import Nav from '../src/components/Nav/Nav';
import Footer from '../src/components/Footer/Footer';
import ContactForm from '../src/components/ContactForm/ContactForm';
import Opinions from '../src/components/Opinions/Opinions';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
