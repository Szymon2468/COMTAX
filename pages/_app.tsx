import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import CookieConsent from 'react-cookie-consent';
import Link from 'next/link';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <CookieConsent
        location='bottom'
        buttonText='OK, rozumiem'
        cookieName='COMTAXCookieConsent'
        style={{ backgroundColor: '#4c4948DD', alignItems: 'center' }}
        buttonStyle={{ background: '#79c05f', color: 'white' }}
        expires={150}
      >
        <div className='container'>
          <p className='smaller' style={{ color: 'white' }}>
            Serwis wykorzystuje pliki cookies. Korzystając ze strony wyrażasz
            zgodę na wykorzystywanie plików cookies.{' '}
            <Link href='/polityka-prywatnosci'>
              <a>dowiedz się więcej.</a>
            </Link>
          </p>
        </div>
      </CookieConsent>
    </>
  );
}

export default MyApp;
