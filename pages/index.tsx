import Head from 'next/head';
import Image from 'next/image';
import OfferTileRight from '../src/components/OfferTile/OfferTileRight';
import styles from './index.module.scss';
import img from '../src/assets/homepage/photos/LandingPicture.png';
import SubTile1 from '../src/assets/homepage/Tiles/SubTile1';
import SubTile2 from '../src/assets/homepage/Tiles/SubTile2';
import SubTile3 from '../src/assets/homepage/Tiles/SubTile3';
import SubTile4 from '../src/assets/homepage/Tiles/SubTile4';

const Home = () => {
  let pageDescription = '';

  return (
    <div className='fluid-container'>
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
                  <div className={styles.icon}></div>
                  <div className={styles.icon}></div>
                </div>
              </div>
              <Image
                src={img.src}
                alt='photo lol idk what to write'
                width='450px'
                height='600px'
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
            btnOnClick={() => {}}
            btnText='Przeczytaj o Nas więcej'
          ></OfferTileRight>
        </div>
      </main>
    </div>
  );
};

export default Home;
