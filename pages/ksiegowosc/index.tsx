import styles from './AccountsPage.module.scss';
import Tile from './Tile/Tile';
import photo1 from '../../src/assets/accountspage/Photo1.jpg';

function AccountsPage() {
  return (
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
        <div className='container'>
          <Tile
            direction='LEFT'
            bgColor='BLUE'
            text='Nie chcesz więcej tracić czasu na comiesięczne zajmowanie się dokumentami oraz deklaracjami? Skorzystaj z usług sprawdzonego biura rachunkowego. Prowadzimy obsługę księgową firm na terenie Katowic oraz całej aglomeracji śląskiej.
              > księgi rachunkowe
              > podatkowa księga przychodów i rozchodów
              > ewidencja przychodów (ryczałt ewidencjonowany)
              > ewidencja VAT
              > ewidencja środków trwałych i wyposażenia
              > sprawozdawczość finansowa i GUS'
            imgText='KSIĘGOWOŚĆ'
            imgUrl={'../../src/assets/accountspage/Photo1.jpg'}
          ></Tile>

          <Tile
            direction='RIGHT'
            bgColor='GREEN'
            text='Nie chcesz więcej tracić czasu na comiesięczne zajmowanie się dokumentami oraz deklaracjami? Skorzystaj z usług sprawdzonego biura rachunkowego. Prowadzimy obsługę księgową firm na terenie Katowic oraz całej aglomeracji śląskiej.
              > księgi rachunkowe
              > podatkowa księga przychodów i rozchodów
              > ewidencja przychodów (ryczałt ewidencjonowany)
              > ewidencja VAT
              > ewidencja środków trwałych i wyposażenia
              > sprawozdawczość finansowa i GUS'
            imgText='KSIĘGOWOŚĆ'
            imgUrl={'../../src/assets/accountspage/Photo1.jpg'}
          ></Tile>

          <Tile
            direction='LEFT'
            bgColor='BLUE'
            text='Nie chcesz więcej tracić czasu na comiesięczne zajmowanie się dokumentami oraz deklaracjami? Skorzystaj z usług sprawdzonego biura rachunkowego. Prowadzimy obsługę księgową firm na terenie Katowic oraz całej aglomeracji śląskiej.
              > księgi rachunkowe
              > podatkowa księga przychodów i rozchodów
              > ewidencja przychodów (ryczałt ewidencjonowany)
              > ewidencja VAT
              > ewidencja środków trwałych i wyposażenia
              > sprawozdawczość finansowa i GUS'
            imgText='KSIĘGOWOŚĆ'
            imgUrl={'../../src/assets/accountspage/Photo1.jpg'}
          ></Tile>

          <Tile
            direction='RIGHT'
            bgColor='GREEN'
            text='Nie chcesz więcej tracić czasu na comiesięczne zajmowanie się dokumentami oraz deklaracjami? Skorzystaj z usług sprawdzonego biura rachunkowego. Prowadzimy obsługę księgową firm na terenie Katowic oraz całej aglomeracji śląskiej.
              > księgi rachunkowe
              > podatkowa księga przychodów i rozchodów
              > ewidencja przychodów (ryczałt ewidencjonowany)
              > ewidencja VAT
              > ewidencja środków trwałych i wyposażenia
              > sprawozdawczość finansowa i GUS'
            imgText='KSIĘGOWOŚĆ'
            imgUrl={'../../src/assets/accountspage/Photo1.jpg'}
          ></Tile>

          <Tile
            direction='LEFT'
            bgColor='BLUE'
            text='Nie chcesz więcej tracić czasu na comiesięczne zajmowanie się dokumentami oraz deklaracjami? Skorzystaj z usług sprawdzonego biura rachunkowego. Prowadzimy obsługę księgową firm na terenie Katowic oraz całej aglomeracji śląskiej.
              > księgi rachunkowe
              > podatkowa księga przychodów i rozchodów
              > ewidencja przychodów (ryczałt ewidencjonowany)
              > ewidencja VAT
              > ewidencja środków trwałych i wyposażenia
              > sprawozdawczość finansowa i GUS'
            imgText='KSIĘGOWOŚĆ'
            imgUrl={'../../src/assets/accountspage/Photo1.jpg'}
          ></Tile>

          <Tile
            direction='RIGHT'
            bgColor='GREEN'
            text='Nie chcesz więcej tracić czasu na comiesięczne zajmowanie się dokumentami oraz deklaracjami? Skorzystaj z usług sprawdzonego biura rachunkowego. Prowadzimy obsługę księgową firm na terenie Katowic oraz całej aglomeracji śląskiej.
              > księgi rachunkowe
              > podatkowa księga przychodów i rozchodów
              > ewidencja przychodów (ryczałt ewidencjonowany)
              > ewidencja VAT
              > ewidencja środków trwałych i wyposażenia
              > sprawozdawczość finansowa i GUS'
            imgText='KSIĘGOWOŚĆ'
            imgUrl={'../../src/assets/accountspage/Photo1.jpg'}
          ></Tile>

          <Tile
            direction='LEFT'
            bgColor='BLUE'
            text='Nie chcesz więcej tracić czasu na comiesięczne zajmowanie się dokumentami oraz deklaracjami? Skorzystaj z usług sprawdzonego biura rachunkowego. Prowadzimy obsługę księgową firm na terenie Katowic oraz całej aglomeracji śląskiej.
              > księgi rachunkowe
              > podatkowa księga przychodów i rozchodów
              > ewidencja przychodów (ryczałt ewidencjonowany)
              > ewidencja VAT
              > ewidencja środków trwałych i wyposażenia
              > sprawozdawczość finansowa i GUS'
            imgText='KSIĘGOWOŚĆ'
            imgUrl={'../../src/assets/accountspage/Photo1.jpg'}
          ></Tile>
        </div>
      </section>
    </section>
  );
}

export default AccountsPage;
