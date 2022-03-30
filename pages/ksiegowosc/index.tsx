import styles from './AccountsPage.module.scss';
import Tile from './Tile/Tile';
import photo1 from '../../src/assets/accountspage/Photo1.jpg';
import photo2 from '../../src/assets/accountspage/Photo2.jpg';
import photo3 from '../../src/assets/accountspage/Photo3.jpg';
import photo4 from '../../src/assets/accountspage/Photo4.jpg';
import photo5 from '../../src/assets/accountspage/Photo5.jpg';
import photo6 from '../../src/assets/accountspage/Photo6.jpg';
import photo7 from '../../src/assets/accountspage/Photo7.jpg';

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
            imgUrl={photo1.src}
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
            imgUrl={photo2.src}
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
            imgUrl={photo3.src}
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
            imgUrl={photo4.src}
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
            imgUrl={photo5.src}
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
            imgUrl={photo6.src}
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
            imgUrl={photo7.src}
          ></Tile>
        </div>
      </section>
    </section>
  );
}

export default AccountsPage;
