import Head from 'next/head';
import Image from 'next/image';
import OfferTileRight from '../src/components/OfferTile/OfferTileRight';
import styles from './index.module.scss';
import img from '../src/assets/homepage/photos/LandingPicture.png';
import SubTile1 from '../src/assets/homepage/Tiles/SubTile1';
import SubTile2 from '../src/assets/homepage/Tiles/SubTile2';
import SubTile3 from '../src/assets/homepage/Tiles/SubTile3';
import SubTile4 from '../src/assets/homepage/Tiles/SubTile4';
import ContactIcon from '../src/assets/homepage/icons/ContactIcon';
import OfferIcon from '../src/assets/homepage/icons/OfferIcon';
import Button from '../src/components/Button/Button';
import about1 from '../src/assets/homepage/photos/about1.jpg';
import about2 from '../src/assets/homepage/photos/about2.jpg';
import about3 from '../src/assets/homepage/photos/about3.jpg';
import OfferTileLeft from '../src/components/OfferTile/OfferTileLeft';
import useWindowSize, { WindowSize } from '../src/hooks/useWindowSize';
import Link from 'next/link';

const Home = () => {
  let pageDescription = '';

  const windowSize: WindowSize = useWindowSize();

  interface SetHomepageImgSizeReturnedValues {
    width: number;
    height: number;
  }

  return (
    <>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <title>
          Oyama Karate Katowice - Ligota - Panewniki - Piotrowice - Podlesie,
          oraz Gliwice - Oyama-karate.eu - Nasze sekcje - oyama-karate.eu
        </title>
        <meta
          property='og:title'
          content={`Oyama Karate Katowice - Ligota - Panewniki - Piotrowice - Podlesie,
          oraz Gliwice - Oyama-karate.eu - Nasze sekcje - oyama-karate.eu`}
          key='ogtitle'
        />
        <meta key='robots' name='robots' content='index,follow' />
        <meta key='googlebot' name='googlebot' content='index,follow' />
        <meta name='description' content={pageDescription} />
        <meta
          property='og:description'
          content={pageDescription}
          key='ogdesc'
        />
      </Head>

      <main>
        <section>
          <div className={styles.landingPage}>
            <div className={`container ${styles.homePageContainer}`}>
              <div className={styles.infoContainer}>
                <div className={styles.titleAndTextContainer}>
                  <header className={styles.title}>
                    <h1>Z NAMI POPROWADZISZ SWOJĄ FIRMĘ LEPIEJ</h1>
                  </header>
                  <p className={styles.text}>
                    Od 2001 roku pomagamy naszym klientom w prostszym i
                    efektywniejszym prowadzeniu firmy. Z nami osiągniesz lepsze
                    rezultaty dzięki usługom księgowości, wirtualnego biura oraz
                    sali konferencyjnej.
                  </p>
                </div>
                <div className={styles.icons}>
                  <Link href='/kontakt'>
                    <div className={styles.icon}>
                      <OfferIcon />
                      <Button
                        text='Skontaktuj się z nami'
                        onClick={() => {}}
                        color='GREEN'
                        type='FULL'
                        btnWidth={300}
                        className={styles.landingPageBtn}
                      ></Button>
                    </div>
                  </Link>
                  <Link href='/ksiegowosc'>
                    <div className={styles.icon}>
                      <ContactIcon />
                      <Button
                        text='Nasza Oferta'
                        onClick={() => {}}
                        color='GREEN'
                        type='OUTLINED'
                        btnWidth={300}
                        className={styles.landingPageBtn}
                      ></Button>
                    </div>
                  </Link>
                </div>
              </div>
              <img
                src={img.src}
                alt='photo lol idk what to write'
                // width={setHomepageImgSize().width}
                // height={setHomepageImgSize().height}
                className={styles.homePageImg}
              />
            </div>
          </div>
        </section>

        <section>
          <div className={styles.secLandingPage}>
            <div className='container'>
              <p className={styles.text}>
                ZAUFAŁO NAM JUŻ PONAD 1000 ZADOWOLONYCH KLIENTÓW
              </p>
              <div className={styles.trustTiles}>
                <SubTile1 />
                <SubTile2 />
                <SubTile3 />
                <SubTile4 />
              </div>
            </div>
          </div>
        </section>

        <div className='container'>
          <div className={styles.beltLeftContainer}>
            <div className={styles.offerTileBelt}></div>
          </div>
          <div className={styles.beltRightContainer}>
            <div className={styles.offerTileBelt}></div>
          </div>

          <OfferTileRight
            title='POZNAJ NAS LEPIEJ JUŻ DZISIAJ'
            text='Biuro Rachunkowe COMTAX istnieje nieprzerwanie od 2001 roku.
           Wieloletnie doświadczenie oraz zdobyta wiedza pozwalają nam zaoferować
           kompleksową i rzetelną obsługę księgową podmiotów gospodarczych. 
           Wychodząc naprzeciw oczekiwaniom rynku w roku 2017 poszerzyliśmy
           zakres naszej działalności o usługi wirtualnego biura. To idealne
           rozwiązanie nie tylko dla osób zakładających działalność gospodarczą 
           ale także dla tych, którzy pragną ograniczyć koszty i zaoszczędzić swój czas.'
            bgColor='BLUE'
            btnColor='TRANSPARENT'
            btnType='OUTLINED'
            btnOnClick={() => {
              window.location.href = '/o-firmie-COMTAX';
            }}
            btnText='Przeczytaj o Nas więcej'
            imgUrl={about1.src}
          ></OfferTileRight>

          <div className={styles.beltLeftContainer}>
            <div className={styles.offerTileBelt}></div>
          </div>
          <div className={styles.beltRightContainer}>
            <div className={styles.offerTileBelt}></div>
          </div>

          <OfferTileLeft
            title='KSIĘGOWOŚĆ, KTÓREJ MOŻESZ ZAUFAĆ'
            text={`Nie chcesz więcej tracić czasu na comiesięczne zajmowanie się dokumentami oraz deklaracjami? Skorzystaj z usług sprawdzonego biura rachunkowego. Prowadzimy obsługę księgową firm na terenie Katowic oraz całej aglomeracji śląskiej.

          Prowadzimy między innymi:
          - Księgi Rachunkowe
          - Podatkową księgę przychodów i rozchodów
          - Ewidencję przychodów / VAT / środków trwałych i wyposażenia
          - Sprawozdawczość finansową i GUS
          ... i wiele innych! Nasza oferta księgowości jest dużo bardziej rozwinięta.`}
            bgColor='GREEN'
            btnColor='TRANSPARENT'
            btnType='OUTLINED'
            btnOnClick={() => {
              window.location.href = '/ksiegowosc';
            }}
            btnText='Poznaj naszą ofertę księgowości'
            imgUrl={about2.src}
          ></OfferTileLeft>

          <div className={styles.beltLeftContainer}>
            <div className={styles.offerTileBelt}></div>
          </div>
          <div className={styles.beltRightContainer}>
            <div className={styles.offerTileBelt}></div>
          </div>

          <OfferTileRight
            title='WIRTUALNE BIURO W KATOWICACH + SALA KONFERENCYJNA
            Krasińskiego 29 - nowy adres Twojej firmy'
            text='SZUKASZ WIRTUALNEGO BIURA LUB SALI KONFERENCYJNEJ W CENTRUM AGLOMERACJI ŚLĄSKIEJ?
            Wirtualne Biuro w Katowicach to świetne rozwiązanie dla małych firm i osób prowadzących 
            działalność gospodarczą z domu lub zdalnie. Z kolei sala konferencyjna to miejsce, 
            w którym możesz zorganizować spotkanie ze swoim Klientem lub partnerem biznesowym. 
            Zapewniamy miejsce parkingowe.'
            bgColor='BLUE'
            btnColor='TRANSPARENT'
            btnType='OUTLINED'
            btnOnClick={() => {
              window.location.href = '/wirtualne-biuro';
            }}
            btnText='Przeczytaj o Nas więcej'
            imgUrl={about3.src}
          ></OfferTileRight>
        </div>
      </main>
    </>
  );
};

export default Home;
