import classNames from 'classnames';
import MasterLayout from '../../src/components/MasterLayout/MasterLayout';
import styles from './policy.module.scss';

function Policy() {
  return (
    <MasterLayout>
      <section>
        <div className={styles.landingPage}>
          <div className={`container ${styles.policyContainer}`}>
            <header>
              <h1 className={styles.title}>
                POLITYKA PRYWATNOŚCI FIRMY COMTAX
              </h1>
            </header>
          </div>
        </div>

        <section className={classNames('container', styles.policy)}>
          <ol>
            <li className='p-smaller'>
              Poprzez piki “cookies” należy rozumieć dane informatyczne
              przechowywane w urządzeniach końcowych użytkowników, przeznaczone
              do korzystania ze stron internetowych. W szczególności są to pliki
              tekstowe, zawierające nazwę strony internetowej, z której
              pochodzą, czas przechowywania ich na urządzeniu końcowym oraz
              unikalny numer.
            </li>
            <br />
            <li className='p-smaller'>
              Serwis nie zbiera w sposób automatyczny żadnych informacji, z
              wyjątkiem informacji zawartych w plikach cookies.
            </li>
            <br />
            <li className='p-smaller'>
              Pliki cookies przeznaczone są do korzystania ze stron serwisu.
              <br />
              Operator wykorzystuje te pliki do:{' '}
              <ul>
                <li>
                  dopasowania zawartości strony internetowej do indywidualnych
                  preferencji użytkownika, przede wszystkim pliki te rozpoznają
                  jego urządzenie, aby zgodnie z jego preferencjami wyświetlić
                  stronę
                </li>
                <li>
                  do tworzenia anonimowych statystyk z wyłączeniem możliwości
                  identyfikacji użytkownika.
                </li>
              </ul>
            </li>
            <br />
            <li className='p-smaller'>
              Pliki cookies wykorzystywane przez partnerów operatora strony
              internetowej, w tym w szczególności użytkowników strony
              internetowej, podlegają ich własnej polityce prywatności.
            </li>
            <br />
            <li className='p-smaller'>
              W trosce o bezpieczeństwo powierzonych nam danych opracowaliśmy
              wewnętrzne procedury i zalecenia, które mają zapobiec
              udostępnieniu danych osobom nieupoważnionym. Kontrolujemy ich
              wykonywanie i stale sprawdzamy ich zgodność z odpowiednimi aktami
              prawnymi – ustawą o ochronie danych osobowych, ustawą o
              świadczeniu usług drogą elektroniczną, a także wszelkiego rodzaju
              aktach wykonawczych i aktach prawa wspólnotowego
            </li>
            <br />
            <li className='p-smaller'>
              Standardowo oprogramowanie służące do przeglądania stron
              internetowych domyślnie dopuszcza umieszczanie plików cookies na
              urządzeniu końcowym Użytkownika. Ustawienia te mogą zostać
              zmienione przez Użytkownika w taki sposób, aby blokować
              automatyczną obsługę “cookies” w ustawieniach przeglądarki
              internetowej bądź informować o ich każdorazowym przesłaniu na
              urządzenia użytkownika.
            </li>
            <br />
            <li className='p-smaller'>
              Użytkownicy Serwisu mogą dokonać w każdym czasie zmiany ustawień
              dotyczących plików cookies. Szczegółowe informacje o możliwości i
              sposobach obsługi plików cookies dostępne są w ustawieniach
              oprogramowania (przeglądarki internetowej).
              <br />
              <br /> Przykładowe opcje edytowania w popularnych przeglądarkach:{' '}
              <ol>
                <li>
                  Mozilla Firefox:{' '}
                  <a
                    href='https://www.support.mozilla.org/pl/kb/ciasteczka'
                    target={'_blank'}
                    referrerPolicy='no-referrer'
                  >
                    support.mozilla.org/pl/kb/ciasteczka
                  </a>
                </li>
                <li>
                  Internet Explorer:{' '}
                  <a
                    href='https://www.support.microsoft.com/kb/278835/pl'
                    target={'_blank'}
                    referrerPolicy='no-referrer'
                  >
                    support.microsoft.com/kb/278835/pl
                  </a>
                </li>
                <li>
                  Google Chrome:{' '}
                  <a
                    href='https://www.support.google.com/chrome/bin/answer.py?hl=pl&answer=95647'
                    target={'_blank'}
                    referrerPolicy='no-referrer'
                  >
                    support.google.com/chrome/bin/answer.py?hl=pl&answer=95647
                  </a>
                </li>
                <li>
                  Safari:{' '}
                  <a
                    href='http://www.safari.helpmax.net/pl/oszczedzanie-czasu/blokowanie-zawartosci/'
                    target={'_blank'}
                    referrerPolicy='no-referrer'
                  >
                    safari.helpmax.net/pl/oszczedzanie-czasu/blokowanie-zawartosci/
                  </a>
                </li>
              </ol>
            </li>
            <br />
            <li className='p-smaller'>
              Operator Serwisu informuje, że zmiany ustawień w przeglądarce
              internetowej użytkownika mogą uniemożliwić poprawne działanie
              Stron Internetowych.
            </li>
          </ol>
        </section>
      </section>
    </MasterLayout>
  );
}

export default Policy;
