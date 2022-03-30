import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import Nav from '../src/components/Nav/Nav';
import Footer from '../src/components/Footer/Footer';
import ContactForm from '../src/components/ContactForm/ContactForm';
import Opinions from '../src/components/Opinions/Opinions';
import AccountsPage from './ksiegowosc';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Nav />
      {/* <AccountsPage /> */}
      <Component {...pageProps} />
      <ContactForm />
      <Opinions />
      <Footer />
    </>
  );
}

export default MyApp;
