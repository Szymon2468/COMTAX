import styles from './ConferenceRoom.module.scss';
import AirConditioningIcon from '../../src/assets/conferencerooms/icons/AirConditioningIcon';
import CalendarIcon from '../../src/assets/conferencerooms/icons/CalendarIcon';
import CoffeIcon from '../../src/assets/conferencerooms/icons/CoffeIcon';
import InternetIcon from '../../src/assets/conferencerooms/icons/InternetIcon';
import KalendarIcon from '../../src/assets/conferencerooms/icons/KalendarIcon';
import WIFIIcon from '../../src/assets/conferencerooms/icons/WIFIIcon';
import Button from '../../src/components/Button/Button';

interface Icon {
  icon: JSX.Element;
  text: JSX.Element;
}

const icons: Icon[] = [
  {
    icon: <CalendarIcon />,
    text: (
      <h3>
        DOSTĘPNOŚĆ 7 DNI <br />W TYGODNIU
      </h3>
    )
  },
  {
    icon: <InternetIcon />,
    text: (
      <h3>
        REZERWACJA <a>ON-LINE</a> , <br />
        PRZEZ <a href='mailto:biuro@krasinskiego29.pl'>E-MAIL</a> LUB <br />
        TELEFONICZNA <a href='tel:48-600-500-620'>+48 600 500 620</a>
      </h3>
    )
  },
  {
    icon: <WIFIIcon />,
    text: (
      <h3>
        BEZPRZEWODOWY <br />
        INTERNET
      </h3>
    )
  },
  {
    icon: <KalendarIcon />,
    text: <h3>FLIPCHART</h3>
  },
  {
    icon: <AirConditioningIcon />,
    text: <h3>KLIMATYZOWANE SALE</h3>
  },
  {
    icon: <CoffeIcon />,
    text: (
      <h3>
        SERWIS KAWOWY <br />
        NA MIEJSCU
      </h3>
    )
  }
];

function index() {
  const generateIcons = () => {
    let result: JSX.Element[] = [];
    icons.map((el) =>
      result.push(
        <div className={styles.icon}>
          {el.icon}
          <div className={styles.iconText}>{el.text}</div>
        </div>
      )
    );
    return result;
  };
  return (
    <main>
      <section>
        <div className={styles.landingPage}>
          <div className={`container ${styles.virtualOfficeContainer}`}>
            <header>
              <h1 className={styles.title}>
                WYNAJEM SALI KONFERENCYJNEJ W KATOWICACH
              </h1>
              <h3 className={styles.titleDesc}>
                Skorzystaj z naszej sali konferencyjnej w centrum Katowic.
                Możesz dokonać rezerwacji korzystając z naszego panelu. Sala
                konferencyjna to miejsce w którym możesz zorganizować spotkanie
                ze swoim Klientem lub partnerem biznesowym. Zapewniamy miejsce
                parkingowe.
              </h3>
            </header>
          </div>
        </div>
      </section>

      <section>
        <div className={`container ${styles.iconsContainer}`}>
          {generateIcons()}
        </div>
      </section>

      <section>
        <div className='container'>
          <h3 className={styles.priceTitle}>NASZ CENNIK:</h3>
          <div className={styles.pricesContainer}>
            <div className={styles.prices}>
              <h3>1 godzina</h3>
              <h3> - 20 zł</h3>
              <h3>netto</h3>
              <h3>3 godziny</h3>
              <h3> - 50 zł</h3>
              <h3>netto</h3>
              <h3>8 godzin</h3>
              <h3> - 130 zł</h3>
              <h3>netto</h3>
              <h3>Cały dzień</h3>
              <h3> - 180 zł</h3>
              <h3>netto</h3>
            </div>
            <Button
              text='ZAREZERWUJ SALĘ JUŻ TERAZ!'
              onClick={() => {}}
              type='OUTLINED'
              color='GREEN'
              btnWidth={600}
              className={styles.priceBtn}
            />
          </div>
        </div>
      </section>

      <section>
        <div className='container'>
          <h2 className={styles.galleryTitle}>
            POZNAJ LEPIEJ NASZĄ SALĘ KONFERENCYJNĄ
          </h2>
          <div className={styles.galleryContainer}></div>
        </div>
      </section>
    </main>
  );
}

export default index;
