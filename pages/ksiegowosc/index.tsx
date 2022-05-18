import styles from './AccountsPage.module.scss';
import Accordion from '../../src/components/Accordion/Accordion';
import MasterLayout from '../../src/components/MasterLayout/MasterLayout';
import { NextSeo } from 'next-seo';

function AccountsPage() {
  return (
    <>
      <NextSeo
        title='Biuro Rachunkowe COMTAX | Księgowość w Katowicach'
        description='Skorzystaj z usług sprawdzonego biura rachunkowego w Katowicach. Obsługujemy firmy z całego Śląska. Powierz księgowość profesjonalistom.'
        canonical='https://krasinskiego29.pl/ksiegowosc/'
      />
      <MasterLayout>
        <section>
          <div className={styles.landingPage}>
            <div className={`container ${styles.accountsContainer}`}>
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
            <h2 className={styles.offersTitle}>
              DOWIEDZ SIĘ WIĘCEJ O NASZEJ OFERCIE
            </h2>

            <div className='container'>
              <Accordion />
            </div>
          </section>
        </section>
      </MasterLayout>
    </>
  );
}

export default AccountsPage;
