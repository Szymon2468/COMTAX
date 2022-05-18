import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import CookieConsent from 'react-cookie-consent';
import Link from 'next/link';
import { DefaultSeo } from 'next-seo';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <DefaultSeo
        title={'COMTAX - Biuro Rachunkowe Katowice'}
        description={
          'COMTAX to sprawdzone biuro rachunkowe, wirtualne biuro oraz sale konferencyjne w Katowicach. Zapoznaj się z naszą ofertą i skorzystaj z usług polecanych przez naszych Klientów.'
        }
        canonical={'https://krasinskiego29.pl/'}
        openGraph={{
          url: 'https://krasinskiego29.pl/',
          type: 'article',
          title: 'COMTAX - Biuro Rachunkowe Katowice',
          description:
            'COMTAX to sprawdzone biuro rachunkowe, wirtualne biuro oraz sale konferencyjne w Katowicach.',
          site_name: 'COMTAX - Biuro Rachunkowe Katowice'
        }}
        additionalMetaTags={[
          {
            property: 'dc:creator',
            content: 'Gancle Studio'
          },
          {
            name: 'application-name',
            content: 'COMTAX'
          },
          {
            httpEquiv: 'x-ua-compatible',
            content: 'IE=edge; chrome=1; firefox=1; safari=1'
          }
        ]}
      />
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
