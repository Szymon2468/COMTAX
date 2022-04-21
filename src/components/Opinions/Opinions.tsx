import styles from './Opinions.module.scss';
import logo1 from '../../assets/opinions/Logo1.jpg';
import logo2 from '../../assets/opinions/Logo2.jpg';
import logo3 from '../../assets/opinions/Logo3.jpg';
import logo4 from '../../assets/opinions/Logo4.jpg';
import logo5 from '../../assets/opinions/Logo5.jpg';
import Opinie from './Opinie';
import QuotesIcon from './QuotesIcon';
import { v4 as uuidv4 } from 'uuid';
import { MutableRefObject, useEffect, useRef } from 'react';
import { opinions } from '../../configs/opinions';

function Opinions() {
  const opinionsRef = useRef() as MutableRefObject<HTMLInputElement>;

  const logos = [logo1, logo2, logo3, logo4, logo5];

  useEffect(() => {
    let opinionIndex = 0;
    const intervalId = setInterval(() => {
      if (opinionsRef && opinionsRef.current) {
        opinionIndex =
          opinionIndex + 1 === opinions.length ? 0 : opinionIndex + 1;
        const prevOpinionIndex =
          opinionIndex === 0 ? opinions.length - 1 : opinionIndex - 1;
        opinionsRef.current.children[prevOpinionIndex].classList.add(
          styles.hidden
        );
        opinionsRef.current.children[opinionIndex].classList.remove(
          styles.hidden
        );
      }
    }, 10000);
    return () => clearInterval(intervalId);
  }, []);

  const generateLogos = () => {
    let result: JSX.Element[] = [];
    logos.map((el) => {
      result.push(<img src={el.src} className={styles.logo} key={uuidv4()} />);
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
            <div className={styles.quotesIcon}>
              <QuotesIcon />
            </div>
            <div className={styles.opinion}>
              <div
                className={`${styles.description} ${styles.wrapper}`}
                ref={opinionsRef}
              >
                {opinions.map((opinion, index) => (
                  <div
                    key={uuidv4()}
                    className={`${index !== 0 ? styles.hidden : ''} ${
                      styles.opinionText
                    }`}
                  >
                    <p>{opinion.text}</p>
                    <div className={styles.author}>
                      <p>
                        ~ {opinion.author}, {opinion.date}
                      </p>
                    </div>
                  </div>
                ))}
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
