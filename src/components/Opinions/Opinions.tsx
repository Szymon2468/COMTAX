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
import { useEffect, useRef } from 'react';

function Opinions() {
  const opinionsRef = useRef();

  const logos = [logo1, logo2, logo3, logo4, logo5];

  const opinions = [
    {
      text: `It is not difficult to put an HTML email link on your webpage but it
     can cause unnecessary spamming problem for your email account. There are people,
      who can run programs to harvest these types of emails and later use them for spamming in various ways.
    You can have another option to facilitate people to send you emails. One option could be to use HTML forms 
    to collect user data and then use PHP or CGI script to send an email.
    A simple example, check our Contact Us Form. We take user feedback using 
    this form and then we are using one CGI program which is collecting this information and sending us email to the one given email ID.`,
      author: 'Jan Kowalski',
      date: '02.08.2021'
    },
    {
      text: `It is not difficult to put an HTML email link on your webpage but it
     can cause unnecessary spamming problem for your email account. There are people,
      who can run prowerwerwerwrwerwact Us Form. We take user feedback using 
    this form and then we are using one CGI program which is collecting this information and sending us email to the one given email ID.`,
      author: 'Lol Kowalski',
      date: '02.08.2021'
    },
    {
      text: `It is not difficult to put an HTML email link on your webpage but it
     can cause unnecessary spamming problem for your email account. There are people,
      who can run programs to harvest these types of emails and later use them for spamming in various ways.
    You can have another option to facilitate people to send you emails. One option could be to use HTML forms 
    A simple example, check our Contact Us Form. We take user feedback using 
    this form and then we are using one CGI program which is collecting this information and sending us email to the one given email ID.`,
      author: 'Jan Lol',
      date: '02.08.2021'
    }
  ];

  const generateLogos = () => {
    let result: JSX.Element[] = [];
    logos.map((el) => {
      result.push(<img src={el.src} className={styles.logo} />);
    });
    return result;
  };

  useEffect(() => {
    let imgIndex = 0;
    const intervalId = setInterval(() => {
      if (opinionsRef && opinionsRef.current) {
        imgIndex = imgIndex + 1 === opinions.length ? 0 : imgIndex + 1;
        const prevImgIndex =
          imgIndex === 0 ? opinions.length - 1 : imgIndex - 1;
        opinionsRef.current.children[prevImgIndex].classList.add(styles.hidden);
        opinionsRef.current.children[imgIndex].classList.remove(styles.hidden);
      }
    }, 4000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <section>
      <div className={styles.landingPage}>
        <div className={`container`}>
          <h2 className={styles.title}>
            TO <span>NASI KLIENCI</span> SĄ DLA NAS <span>NASI KLIENCI</span>
          </h2>
          <div className={styles.googleContainer}>
            <div className={styles.quotesAndTextContainer}>
              <div className={styles.quotes}>
                <QuotesIcon />
              </div>
              <div className={styles.opinion}>
                <h3
                  className={`${styles.description} ${styles.wrapper}`}
                  ref={opinionsRef}
                >
                  {opinions.map((opinion, index) => (
                    <div
                      key={index}
                      className={`${index !== 0 ? styles.hidden : ''} ${
                        styles.opinionText
                      }`}
                    >
                      {opinion.text}
                      <div className={styles.author}>
                        <p>
                          ~ {opinion.author}, {opinion.date}
                        </p>
                      </div>
                    </div>
                  ))}
                </h3>
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
