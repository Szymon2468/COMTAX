import MasterLayout from '../../src/components/MasterLayout/MasterLayout';
import styles from './About.module.scss';
import { NextSeo } from 'next-seo';

function index() {
  return (
    <>
      <NextSeo
        title='COMTAX - Sprawdzone biuro rachunkowe w Katowicach'
        description='COMTAX to biuro rachunkowe działające na śląskim rynku od 2001 roku. Wykorzystaj nasze wieloletnie doświadczenie oraz zdobytą wiedzę w swoim biznesie.'
        canonical='https://krasinskiego29.pl/o-firmie-COMTAX/'
      />
      <MasterLayout>
        <section>
          <div className={styles.landingPage}>
            <div className={`container ${styles.accountsContainer}`}>
              <header>
                <h1 className={styles.title}>
                  POZNAJ COMTAX - KSIĘGOWOŚĆ, WIRTUALNE BIURO, SALE
                  KONFERENCYJNE
                </h1>
                <h2 className={styles.about}>
                  Biuro Rachunkowe Comtax istnieje nieprzerwanie od 2001 roku.
                  Wieloletnie doświadczenie oraz zdobyta wiedza pozwalają nam
                  zaoferować kompleksową i rzetelną obsługę księgową podmiotów
                  gospodarczych. Posiadamy uprawnienia nadane przez Ministerstwo
                  Finansów do usługowego prowadzenia ksiąg rachunkowych o
                  numerze 22789/01. <br /> <br />
                  Wychodząc naprzeciw oczekiwaniom rynku w roku 2017
                  poszerzyliśmy zakres naszej działalności o usługi wirtualnego
                  biura. To idealne rozwiązanie nie tylko dla osób zakładających
                  działalność gospodarczą ale także dla tych, którzy pragną
                  ograniczyć koszty i zaoszczędzić swój czas. Zapraszamy do
                  współpracy.
                </h2>
              </header>
            </div>
          </div>
        </section>
      </MasterLayout>
    </>
  );
}

export default index;
