import styles from './VirtualOffice.module.scss';
import LeftArrowIcon from '../../src/assets/virtualofficepage/icons/LeftArrowIcon';
import RightArrowIcon from '../../src/assets/virtualofficepage/icons/RightArrowIcon';
import PackageTile from './PackageTile/PackageTile';
import Input from '../../src/components/Input/Input';
import { Fragment, useState } from 'react';
import { ArrowProps } from 'react-multi-carousel/lib/types';
import Carousel from 'react-multi-carousel';

const offers: JSX.Element[] = [
  <p>adres do korespondencji</p>,
  <p>odbiór przesyłek listowych</p>,
  <p>przechowywanie przesyłek listowych</p>,
  <p>odbiór przesyłek kurierskich</p>,
  <p>przechowywanie przesyłek kurierskich</p>,
  <p>adres do rejestracji firmy</p>,
  <p>możliwość umieszczenia adresu na materiałach reklamowych</p>,
  <p>powiadamianie o odebranej korespondencji (e-mail)</p>,
  <p>
    dostęp do sali konferencyjnej/pokoju spotkań biznesowych, stanowiska pracy
    wraz z miejscem parkingowym <sup>2</sup>
  </p>,
  <p>
    skanowanie korespondencji i przesyłanie w formacie pdf na wskazany adres
    e-mail <sup>3</sup>
  </p>,
  <p>dyżur telefoniczny do godz. 20:00</p>,
  <p>obsługa poczty wychodzącej</p>
];

const addedOffers: JSX.Element[] = [
  <p>powiadamianie o odebranej korespondencji (e-mail)</p>,
  <p>obsługa poczty wychodzącej</p>,
  <p>fakturowanie</p>,
  <p>
    dostęp do sali konferencyjnej/pokoju spotkań biznesowych wraz z miejscem
    parkingowym
  </p>,
  <p>dostęp do stanowiska pracy wraz z miejscem parkingowym</p>,
  <p>
    skanowanie korespondencji i przesyłanie w formacie pdf na wskazany adres
    e-mail
  </p>,
  <p>
    przesyłanie odebranej korespondencji na wskazany adres w Polsce (raz w
    miesiącu)
  </p>
];

const priceList: JSX.Element[] = [
  <p>płatność za 1 miesiąc z góry</p>,
  <p>płatność za 6 miesięcy z góry</p>,
  <p>płatność za 12 miesięcy z góry</p>
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

  const responsive = {
    desktop: {
      breakpoint: { max: 5000, min: 1160 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1160, min: 768 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 768, min: 0 },
      items: 1
    }
  };

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

      <section>
        <div className={`container ${styles.carouselleContainer}`}>
          <div onClick={handleLeftArrowClick}>
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
          </div>
        </div>
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
