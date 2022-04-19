import styles from './VirtualOffice.module.scss';
import LeftArrowIcon from '../../src/assets/virtualofficepage/icons/LeftArrowIcon';
import RightArrowIcon from '../../src/assets/virtualofficepage/icons/RightArrowIcon';
import PackageTile from './PackageTile/PackageTile';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Mousewheel, Keyboard } from 'swiper';
import Input from '../../src/components/Input/Input';
import { Fragment, useState } from 'react';
import useWindowSize, { WindowSize } from '../../src/hooks/useWindowSize';

const offers: JSX.Element[] = [
  <p key={'o-1'}>adres do korespondencji</p>,
  <p key={'o-2'}>odbiór przesyłek listowych</p>,
  <p key={'o-3'}>przechowywanie przesyłek listowych</p>,
  <p key={'o-4'}>odbiór przesyłek kurierskich</p>,
  <p key={'o-5'}>przechowywanie przesyłek kurierskich</p>,
  <p key={'o-6'}>adres do rejestracji firmy</p>,
  <p key={'o-7'}>możliwość umieszczenia adresu na materiałach reklamowych</p>,
  <p key={'o-8'}>powiadamianie o odebranej korespondencji (e-mail)</p>,
  <p key={'o-9'}>
    dostęp do sali konferencyjnej/pokoju spotkań biznesowych, stanowiska pracy
    wraz z miejscem parkingowym <sup>2</sup>
  </p>,
  <p key={'o-10'}>
    skanowanie korespondencji i przesyłanie w formacie pdf na wskazany adres
    e-mail <sup>3</sup>
  </p>,
  <p key={'o-11'}>dyżur telefoniczny do godz. 20:00</p>,
  <p key={'o-12'}>obsługa poczty wychodzącej</p>
];

const addedOffers: JSX.Element[] = [
  <p key={'ao-1'}>powiadamianie o odebranej korespondencji (e-mail)</p>,
  <p key={'ao-2'}>obsługa poczty wychodzącej</p>,
  <p key={'ao-3'}>fakturowanie</p>,
  <p key={'ao-4'}>
    dostęp do sali konferencyjnej/pokoju spotkań biznesowych wraz z miejscem
    parkingowym
  </p>,
  <p key={'ao-5'}>dostęp do stanowiska pracy wraz z miejscem parkingowym</p>,
  <p key={'ao-6'}>
    skanowanie korespondencji i przesyłanie w formacie pdf na wskazany adres
    e-mail
  </p>,
  <p key={'ao-7'}>
    przesyłanie odebranej korespondencji na wskazany adres w Polsce (raz w
    miesiącu)
  </p>
];

const priceList: JSX.Element[] = [
  <p key={'pl-1'}>płatność za 1 miesiąc z góry</p>,
  <p key={'pl-2'}>płatność za 6 miesięcy z góry</p>,
  <p key={'pl-3'}>płatność za 12 miesięcy z góry</p>
];

interface PackageTileData {
  title: string;
  content: JSX.Element;
  price: number;
}

const packageTiles: PackageTileData[] = [
  {
    title: 'POCZTA',
    content: (
      <p>
        Usługi w pakiecie: <br /> - adres do korespondencji <br />
        - odbiór przesyłek listowych
        <br />
        - przechowywanie przesyłek listowych (30 dni)
        <br />
        - odbiór przesyłek kurierskich
        <br />- przechowywanie przesyłek kurierskich (14 dni)
      </p>
    ),
    price: 10
  },
  {
    title: 'ADRES',
    content: (
      <p>
        Usługi z pakietu ADRES plus: <br />
        - adres do rejestracji firmy
        <br />
        - możliwość umieszczenia adresu na materiałach reklamowych
        <br />
        - powiadamianie o odebranej korespondencji (e-mail)
        <br />
        - dostęp do sali konferencyjnej/pokoju spotkań biznesowych, stanowiska
        pracy wraz z miejscem parkingowym (2h/m-c)
        <br />- powiadamianie o odebranej korespondencji (e-mail)
      </p>
    ),
    price: 10
  },
  {
    title: 'ADRES+',
    content: (
      <p>
        Usługi z pakietu ADRES+ plus: <br />
        - dostęp do sali konferencyjnej/pokoju spotkań biznesowych, stanowiska
        pracy wraz z miejscem parkingowym (4h/m-c) <br />
        - skanowanie korespondencji i przesyłanie w formacie pdf na wskazany
        adres e-mail <br />
        (100 stron/m-c) - obsługa poczty wychodzącej
      </p>
    ),
    price: 10
  },
  {
    title: 'FIRMA',
    content: <h3>FLIPCHART</h3>,
    price: 10
  },
  {
    title: 'FIRMA+',
    content: <h3>KLIMATYZOWANE SALE</h3>,
    price: 10
  }
];

const comparisingTableSelectOptions: string[] = [
  'POCZTA',
  'ADRES',
  'ADRES+',
  'FIRMA+'
];

function VirtualOffice() {
  const [start, setStart] = useState(0);
  const windowSize: WindowSize = useWindowSize();

  const generateOfferTable = (tab: JSX.Element[]) => {
    const result: JSX.Element[] = [];
    tab.map((el) =>
      result.push(
        <>
          <div>{el}</div>
          <div></div>
          <div></div>
        </>
      )
    );
    return result;
  };

  const handleLeftArrowClick = () => {
    if (start > 0) {
      setStart(start - 1);
    }
    return;
  };

  const handleRightArrowClick = () => {
    console.log(start);
    if (start < 2) {
      setStart(start + 1);
    }
    return;
  };

  return (
    <section>
      <div className={styles.landingPage}>
        <div className={`container ${styles.virtualOfficeContainer}`}>
          <header>
            <h1 className={styles.title}>
              PROWADZIMY USŁUGI Z ZAKRESU KSIĘGOWOŚCI OD PONAD 20 LAT <br />
              <br />
              COMTAX - Księgowość, której możesz zaufać
            </h1>
          </header>
        </div>
      </div>

      <section className={`${styles.offerSection}`}>
        <header>
          <h2 className={styles.comparisonTitle}>POZNAJ NASZĄ OFERTĘ</h2>
        </header>
        <main className='container'>
          <Swiper
            slidesPerView={1}
            breakpoints={{
              850: {
                slidesPerView: 2,
                spaceBetween: 0
              },
              1200: {
                slidesPerView: 3,
                spaceBetween: 0
              }
            }}
            cssMode={true}
            navigation={windowSize.width > 480 ? true : false}
            pagination={{
              clickable: true
            }}
            mousewheel={true}
            keyboard={true}
            modules={[Pagination, Navigation, Mousewheel, Keyboard]}
            className={styles.swiper}
          >
            {packageTiles.map((el) => (
              <SwiperSlide key={`carousel-item-${el.title}`}>
                <PackageTile
                  title={el.title}
                  content={el.content}
                  price={el.price}
                  className={styles.activePackageTile}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </main>
        {/* <div className={`container ${styles.carouselleContainer}`}> */}
        {/* <div onClick={handleLeftArrowClick}>
            <LeftArrowIcon />
          </div>

          <div className={styles.offerSlider}>
            <div className={styles.offerSliderContent}>
              {packageTiles.map((el) => (
                <Fragment key={`carousel-item-${el.title}`}>
                  <PackageTile
                    title={el.title}
                    content={el.content}
                    price={el.price}
                    className={styles.activePackageTile}
                  />
                </Fragment>
              ))}
            </div>
          </div>

          <div onClick={handleRightArrowClick}>
            <RightArrowIcon />
          </div> */}
        {/* </div> */}
      </section>

      <section>
        <div className='container'>
          <header>
            <h2 className={styles.comparisonTitle}>PORÓWNAJ NASZE PAKIETY</h2>
          </header>
          <div className={styles.table}>
            <header className={styles.tableHeader}>
              <h2>PEŁNA LISTA USŁUG </h2>
              <h2>PAKIET FIRMA</h2>
              <h2>
                <Input
                  typeOfInput='SELECT'
                  options={comparisingTableSelectOptions}
                />
              </h2>
            </header>

            <div className={styles.priceListTitleContainer}>
              <div className={styles.belt}></div>
              <h3 className={styles.priceListTitle}>USŁUGI</h3>
              <div className={styles.belt}></div>
            </div>

            <div className={styles.tableContentOffers}>
              {generateOfferTable(offers)}
            </div>

            <div className={styles.priceListTitleContainer}>
              <div className={styles.belt}></div>
              <h3 className={styles.priceListTitle}>CENNIK</h3>
              <div className={styles.belt}></div>
            </div>

            <div className={styles.tableContentPriceList}>
              {generateOfferTable(priceList)}
            </div>

            <div className={styles.priceListTitleContainer}>
              <div className={styles.belt}></div>
              <h3 className={styles.priceListTitle}>USŁUGI DODATKOWE</h3>
              <div className={styles.belt}></div>
            </div>

            <div className={styles.tableContentAddedOffers}>
              {generateOfferTable(addedOffers)}
            </div>
          </div>
          <p>
            Wszystkie podane ceny są cenami netto. <br /> <br />
            1) Pakiet dostępny wyłącznie dla osób nieprowadzących działalności
            gospodarczej
            <br /> <br />
            2) Sala konferencyjna/pokój spotkań biznesowych są dostępne 7 dni w
            tygodniu po wcześniejszej rezerwacji. Wyposażenie sali
            konferencyjnej: stół. 6 krzeseł, flipchart, dostęp do
            bezprzewodowego Internetu, klimatyzacja, serwis kawowy. Stanowisko
            pracy jest dostępne w godzinach pracy biura.
            <br /> <br />
            3) Skanowaniu nie podlegają książki, materiały reklamowe i pozostałe
            w formacie innym niż pojedyncze kartki A4. Awers koperty liczony
            jest jako jedna strona.
          </p>
        </div>
      </section>
    </section>
  );
}

export default VirtualOffice;
