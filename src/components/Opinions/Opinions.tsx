import styles from './Opinions.module.scss';
import logo1 from '../../assets/opinions/Logo1.jpg';
import logo2 from '../../assets/opinions/Logo2.jpg';
import logo3 from '../../assets/opinions/Logo3.jpg';
import logo4 from '../../assets/opinions/Logo4.jpg';
import logo5 from '../../assets/opinions/Logo5.jpg';
import Opinie from './Opinie';
import QuotesIcon from './QuotesIcon';
import ArrowsIcon from './ArrowsIcon';
import ArrowIcon from '../Icons/ArrowIcon';

function Opinions() {
  const logos = [logo1, logo2, logo3, logo4, logo5];

  const generateLogos = () => {
    let result: JSX.Element[] = [];
    logos.map((el) => {
      result.push(<img src={el.src} className={styles.logo} />);
    });
    return result;
  };

  return (
    <section>
      <div className={styles.landingPage}>
        <div className={`container`}>
          <h2 className={styles.title}>
            TO <span>NASI KLIENCI</span> SĄ DLA NAS <span>NASI KLIENCI</span>
          </h2>
          <div className={styles.googleContainer}>
            <div className={styles.google}>
              <QuotesIcon />
            </div>
            <div className={styles.opinion}>
              <h3 className={styles.description}>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Aenean sit amet sagittis massa. Praesent viverra molestie
                  ligula, in scelerisque velit vehicula in. Cras mi dui,
                  tincidunt vitae orci ac, placerat suscipit odio. Donec justo
                  leo, volutpat mattis tellus id, finibus sollicitudin enim.
                </p>
                <p>
                  Suspendisse placerat iaculis mauris et finibus. Aliquam
                  tincidunt nisi in mi sodales, nec laoreet nisl dapibus.
                </p>{' '}
              </h3>
              <div className={styles.author}>
                <p>~ Jan Kowalski, 2022</p>
                <p>
                  Następna opinia <ArrowIcon />
                </p>
              </div>
            </div>
            <div className={styles.google}>
              <Opinie />
            </div>
          </div>
          <div className={styles.collabs}>
            <h3 className={styles.logosTitle}>
              <span>ONI</span> z nami współpracują
            </h3>

            <div className={styles.logos}>{generateLogos()}</div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Opinions;
