import Head from 'next/head';
import styles from './contact.module.scss';

function index() {
  let pageDescription = '';

  return (
    <>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <title>
          Oyama Karate Katowice - Ligota - Panewniki - Piotrowice - Podlesie,
          oraz Gliwice - Oyama-karate.eu - Nasze sekcje - oyama-karate.eu
        </title>
        <meta
          property='og:title'
          content={`Oyama Karate Katowice - Ligota - Panewniki - Piotrowice - Podlesie,
          oraz Gliwice - Oyama-karate.eu - Nasze sekcje - oyama-karate.eu`}
          key='ogtitle'
        />
        <meta key='robots' name='robots' content='index,follow' />
        <meta key='googlebot' name='googlebot' content='index,follow' />
        <meta name='description' content={pageDescription} />
        <meta
          property='og:description'
          content={pageDescription}
          key='ogdesc'
        />
      </Head>
      <section>
        <div className={styles.landingPage}>
          <div className={`container ${styles.contactContainer}`}>
            <header>
              <h1>
                ZAPRASZAMY DO KONTAKTU Z NAMI <br /> CZEKAMY NA TWÓJ TELEFON{' '}
                <br />
              </h1>
              <br />
              <h2>Godziny otwarcia </h2>
              <p>
                od poniedziałku do piątku w godzinach 9:00 – 15:00 (inne godziny
                do uzgodnienia)
              </p>
              <br />
              <h2>Możliwość pozostawienia dokumentów</h2>
              <p>od poniedziałku do piątku w godzinach 7:00 – 18:00</p>
              <br />
              <div className={styles.address}>
                <h3>Krasińskiego 29, pok. 12</h3>
                <h3>40-019 Katowice</h3>
              </div>
            </header>
          </div>
        </div>
      </section>
      <section className={styles.mapContainer}>
        <header>
          <h2>
            TO <span>TUTAJ</span> MOŻESZ NAS ZNALEŹĆ
          </h2>
        </header>
        <main>
          <div
            dangerouslySetInnerHTML={{
              __html: `<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2550.9932648842637!2d19.03636691572432!3d50.254710079448856!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4716cfb5942ea8bb%3A0xcea0eb302e8838b1!2sKrasi%C5%84skiego%2029%2C%2040-272%20Katowice!5e0!3m2!1spl!2spl!4v1648663838881!5m2!1spl!2spl" width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`
            }}
          />
        </main>
      </section>
    </>
  );
}

export default index;
