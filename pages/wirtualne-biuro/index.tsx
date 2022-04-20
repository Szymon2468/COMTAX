import styles from './VirtualOffice.module.scss';
import LeftArrowIcon from '../../src/assets/virtualofficepage/icons/LeftArrowIcon';
import RightArrowIcon from '../../src/assets/virtualofficepage/icons/RightArrowIcon';
import PackageTile from './PackageTile/PackageTile';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Mousewheel, Keyboard } from 'swiper';
import Input from '../../src/components/Input/Input';
import { Fragment, useState } from 'react';
import useWindowSize, { WindowSize } from '../../src/hooks/useWindowSize';
import {
  addedOffers,
  offers,
  packageTiles,
  priceList
} from '../../src/configs/virtualOffice/virtualOffice';

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
          <h2 className={styles.comparisonTitle}>
            POZNAJ NASZĄ <span>OFERTĘ</span>
          </h2>
        </header>
        <main className='container'>
          <Swiper
            slidesPerView={1}
            breakpoints={{
              1024: {
                slidesPerView: 2,
                spaceBetween: 0
              },
              1200: {
                slidesPerView: 3,
                spaceBetween: 0
              }
            }}
            cssMode={true}
            navigation={windowSize.width > 580 ? true : false}
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

          <p className={`smaller ${styles.offerInfo}`}>
            <strong>
              Podane ceny są cenami netto i obowiązują przy współpracy
              podpisanej na 12 miesięcy. Ceny przy krótszych współpracach podano
              w porównaniu pakietów poniżej.
            </strong>
            <br /> <br />
            1) Sala konferencyjna/pokój spotkań biznesowych są dostępne 7 dni w
            tygodniu po wcześniejszej rezerwacji. Wyposażenie sali
            konferencyjnej: stół, 6 krzeseł, flipchart, dostęp do
            bezprzewodowego Internetu, klimatyzacja, serwis kawowy. Stanowisko
            pracy jest dostępne w godzinach pracy biura.
            <br /> <br />
            2) Skanowaniu nie podlegają książki, materiały reklamowe i pozostałe
            w formacie innym niż pojedyncze kartki A4. Awers koperty liczony
            jest jako jedna strona.
          </p>
        </main>
      </section>

      <section className={styles.tableSection}>
        <div className='container'>
          <header>
            <h2 className={styles.comparisonTitle}>
              <span>PORÓWNAJ</span> NASZE PAKIETY
            </h2>
          </header>
          <div className={styles.table}>
            <header className={styles.tableHeader}>
              <h2>PEŁNA LISTA USŁUG </h2>
              <h2>PAKIET FIRMA</h2>
              <h2>
                {/* <Input
                  typeOfInput='SELECT'
                  options={comparisingTableSelectOptions}
                /> */}
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
        </div>
      </section>
    </section>
  );
}

export default VirtualOffice;
