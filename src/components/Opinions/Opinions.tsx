import styles from './Opinions.module.scss';
import logo1 from '../../assets/opinions/Logo1.jpg';
import logo2 from '../../assets/opinions/Logo2.jpg';
import logo3 from '../../assets/opinions/Logo3.jpg';
import logo4 from '../../assets/opinions/Logo4.jpg';
import logo5 from '../../assets/opinions/Logo5.jpg';
import Image from 'next/image';

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
