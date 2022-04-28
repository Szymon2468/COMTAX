import styles from './AccountsPage.module.scss';
import Tile from '../../src/components/Tile/Tile';
import photo1 from '../../src/assets/accountspage/Photo1.jpg';
import photo2 from '../../src/assets/accountspage/Photo2.jpg';
import photo3 from '../../src/assets/accountspage/Photo3.jpg';
import photo4 from '../../src/assets/accountspage/Photo4.jpg';
import photo5 from '../../src/assets/accountspage/Photo5.jpg';
import photo6 from '../../src/assets/accountspage/Photo6.jpg';
import photo7 from '../../src/assets/accountspage/Photo7.jpg';
import Accordion from '../../src/components/Accordion/Accordion';
import MasterLayout from '../../src/components/MasterLayout/MasterLayout';

function AccountsPage() {
  return (
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
  );
}

export default AccountsPage;
