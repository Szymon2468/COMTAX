import styles from './VirtualOffice.module.scss';
import PackageTile from './PackageTile/PackageTile';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Mousewheel, Keyboard } from 'swiper';
import { Fragment, useState } from 'react';
import useWindowSize, { WindowSize } from '../../src/hooks/useWindowSize';
import { v4 as uuidv4 } from 'uuid';
import {
  IAdditionalFacilities,
  IFacilities,
  IPrices,
  packageTiles,
  tableOffers,
  tableRows,
  tableSelectOptions
} from '../../src/configs/virtualOffice/virtualOffice';
import classNames from 'classnames';

function VirtualOffice() {
  const [chosenPackage, setChosenPackage] = useState('poczta');
  const windowSize: WindowSize = useWindowSize();

  const generateAdditionalFacility = (value: string | boolean | undefined) => {
    if (typeof value === 'string') {
      return value;
    } else {
      return value ? 'tak' : 'nie';
    }
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
            {packageTiles.map((el, index) => (
              <Fragment key={uuidv4()}>
                <SwiperSlide key={`carousel-item-${el.title}`}>
                  <PackageTile
                    title={el.title}
                    content={el.content}
                    price={el.price}
                    className={styles.activePackageTile}
                  />
                </SwiperSlide>
              </Fragment>
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
          <div className={styles.offersTable}>
            <table className={styles.facilitiesTable}>
              <thead>
                <tr>
                  <th>
                    <p>PEŁNA LISTA USŁUG</p>
                  </th>
                  <th
                    className={classNames(
                      styles.comparisionColumn,
                      styles.offerColumn
                    )}
                  >
                    <p>FIRMA</p>
                  </th>
                  <th className={classNames(styles.offerColumn)}>
                    <p>
                      {
                        tableSelectOptions.find(
                          (el) => el.value === chosenPackage
                        )?.label
                      }
                    </p>
                  </th>
                </tr>
              </thead>
              <tbody>
                {tableRows
                  .filter((el) => el.type === 'facilities')
                  .map((row) => (
                    <tr key={uuidv4()}>
                      <td>
                        <p className='smaller'>{row.name}</p>
                      </td>
                      <td className={styles.comparisionColumn}>
                        <p className='smaller'>
                          {tableOffers.find((el) => el.package === 'firma')
                            ?.facilities[row.label as keyof IFacilities]
                            ? 'tak'
                            : 'nie'}
                        </p>
                      </td>
                      <td>
                        <p className='smaller'>
                          {tableOffers.find(
                            (el) => el.package === chosenPackage
                          )?.facilities[row.label as keyof IFacilities]
                            ? 'tak'
                            : 'nie'}
                        </p>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>

            <table className={styles.pricesTable}>
              <thead>
                <tr>
                  <th>
                    <p>CENNIK</p>
                  </th>
                  <th
                    className={classNames(
                      styles.comparisionColumn,
                      styles.offerColumn
                    )}
                  >
                    <p>FIRMA</p>
                  </th>
                  <th className={classNames(styles.offerColumn)}>
                    <p>
                      {
                        tableSelectOptions.find(
                          (el) => el.value === chosenPackage
                        )?.label
                      }
                    </p>
                  </th>
                </tr>
              </thead>
              <tbody>
                {tableRows
                  .filter((el) => el.type === 'prices')
                  .map((row) => (
                    <tr key={uuidv4()}>
                      <td>
                        <p className='smaller'>{row.name}</p>
                      </td>
                      <td className={styles.comparisionColumn}>
                        <p className='smaller'>
                          {
                            tableOffers.find((el) => el.package === 'firma')
                              ?.prices[row.label as keyof IPrices]
                          }
                        </p>
                      </td>
                      <td>
                        <p className='smaller'>
                          {
                            tableOffers.find(
                              (el) => el.package === chosenPackage
                            )?.prices[row.label as keyof IPrices]
                          }
                        </p>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>

            <table className={styles.pricesTable}>
              <thead>
                <tr>
                  <th>
                    <p>USŁUGI DODATKOWE</p>
                  </th>
                  <th
                    className={classNames(
                      styles.comparisionColumn,
                      styles.offerColumn
                    )}
                  >
                    <p>FIRMA</p>
                  </th>
                  <th className={classNames(styles.offerColumn)}>
                    <p>
                      {
                        tableSelectOptions.find(
                          (el) => el.value === chosenPackage
                        )?.label
                      }
                    </p>
                  </th>
                </tr>
              </thead>
              <tbody>
                {tableRows
                  .filter((el) => el.type === 'additionalFacilities')
                  .map((row) => (
                    <tr key={uuidv4()}>
                      <td>
                        <p className='smaller'>{row.name}</p>
                      </td>
                      <td className={styles.comparisionColumn}>
                        <p className='smaller'>
                          {generateAdditionalFacility(
                            tableOffers.find((el) => el.package === 'firma')
                              ?.additionalFacilities[
                              row.label as keyof IAdditionalFacilities
                            ]
                          )}
                        </p>
                      </td>
                      <td>
                        <p className='smaller'>
                          {generateAdditionalFacility(
                            tableOffers.find(
                              (el) => el.package === chosenPackage
                            )?.additionalFacilities[
                              row.label as keyof IAdditionalFacilities
                            ]
                          )}
                        </p>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          {/* <header>
            <h2 className={styles.comparisonTitle}>
              <span>PORÓWNAJ</span> NASZE PAKIETY
            </h2>
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
          </div> */}
        </div>
      </section>
    </section>
  );
}

export default VirtualOffice;
