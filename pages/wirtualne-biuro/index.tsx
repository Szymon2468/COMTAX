import styles from './VirtualOffice.module.scss';
import LeftArrowIcon from '../../src/assets/virtualofficepage/icons/LeftArrowIcon';
import RightArrowIcon from '../../src/assets/virtualofficepage/icons/RightArrowIcon';
import PackageTile from './PackageTile/PackageTile';
import Input from '../../src/components/Input/Input';

const offers: string[] = [
  'adres do korespondencji',
  'odbiór przesyłek listowych',
  'przechowywanie przesyłek listowych',
  'odbiór przesyłek kurierskich',
  'przechowywanie przesyłek kurierskich',
  'adres do rejestracji firmy',
  'możliwość umieszczenia adresu na materiałach reklamowych',
  'powiadamianie o odebranej korespondencji (e-mail)',
  'dostęp do sali konferencyjnej/pokoju spotkań biznesowych, stanowiska pracy wraz z miejscem parkingowym 2',
  'skanowanie korespondencji i przesyłanie w formacie pdf na wskazany adres e-mail 3',
  'dyżur telefoniczny do godz. 20:00',
  'obsługa poczty wychodzącej'
];

const addedOffers: string[] = [
  'powiadamianie o odebranej korespondencji (e-mail)',
  'obsługa poczty wychodzącej',
  'fakturowanie',
  'dostęp do sali konferencyjnej/pokoju spotkań biznesowych wraz z miejscem parkingowym',
  'dostęp do stanowiska pracy wraz z miejscem parkingowym',
  'skanowanie korespondencji i przesyłanie w formacie pdf na wskazany adres e-mail',
  'przesyłanie odebranej korespondencji na wskazany adres w Polsce (raz w miesiącu)'
];

const priceList: string[] = [
  'płatność za 1 m-c z góry',
  'płatność za 6 m-cy z góry',
  'płatność za 12 m-cy z góry'
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

const generatePackagesTiles = (start: number) => {
  let results: JSX.Element[] = [];
  for (let i = start; i < start + 3; i++) {
    if (i === start + 1) {
      results.push(
        <PackageTile
          title={packageTiles[i].title}
          content={packageTiles[i].content}
          price={packageTiles[i].price}
          className={styles.activePackageTile}
        />
      );
    } else {
      results.push(
        <PackageTile
          title={packageTiles[i].title}
          content={packageTiles[i].content}
          price={packageTiles[i].price}
        />
      );
    }
  }
  return results;
};

function VirtualOffice() {
  const generateOfferTable = (tab: string[]) => {
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
          <LeftArrowIcon />
          {generatePackagesTiles(0)}
          <RightArrowIcon />
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
