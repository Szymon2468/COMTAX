import styles from './ContactForm.module.scss';
import FacebookIcon from '../../assets/contactform/icons/FacebookIcon';
import MailIcon from '../../assets/contactform/icons/MailIcon';
import MapPinIcon from '../../assets/contactform/icons/MapPinIcon';
import PhoneIcon from '../../assets/contactform/icons/PhoneIcon';
import Input from '../Input/Input';
import Button from '../Button/Button';
import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { HTTPRequest } from '../../lib/httpRequest';

function ContactForm() {
  const contactRef = useRef() as MutableRefObject<HTMLSelectElement>;

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [msg, setMsg] = useState('');

  const [isNameEmptyErrorVisible, setisNameEmptyErrorVisible] = useState(false);
  const [isPhoneEmptyErrorVisible, setisPhoneEmptyErrorVisible] =
    useState(false);
  const [isEmailEmptyErrorVisible, setisEmailEmptyErrorVisible] =
    useState(false);
  const [isMsgEmptyErrorVisible, setisMsgEmptyErrorVisible] = useState(false);

  const [isPhoeIncorrect, setIsPhoneIncorrect] = useState(false);
  const [isEmailIncorrect, setIsEmailIncorrect] = useState(false);

  const [isMsgSent, setIsMsgSent] = useState(false);

  const [isMsgSendigError, setIsMsgSendigError] = useState(false);

  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const phoneRegex = /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/;

  const sendEmail = async () => {
    if (
      name === '' ||
      phone === '' ||
      email === '' ||
      msg === '' ||
      phoneRegex.test(phone) === false ||
      emailRegex.test(email) === false
    ) {
      if (name === '') {
        setisNameEmptyErrorVisible(true);
      } else {
        setisNameEmptyErrorVisible(false);
      }

      if (phone === '') {
        setisPhoneEmptyErrorVisible(true);
      } else {
        setisPhoneEmptyErrorVisible(false);
      }

      if (email === '') {
        setisEmailEmptyErrorVisible(true);
      } else {
        setisEmailEmptyErrorVisible(false);
      }

      if (msg === '') {
        setisMsgEmptyErrorVisible(true);
      } else {
        setisMsgEmptyErrorVisible(false);
      }

      if (phoneRegex.test(phone) === false && phone !== '') {
        setIsPhoneIncorrect(true);
      } else {
        setIsPhoneIncorrect(false);
      }

      if (emailRegex.test(email) === false && email !== '') {
        setIsEmailIncorrect(true);
      } else {
        setIsEmailIncorrect(false);
      }
    } else {
      setisNameEmptyErrorVisible(false);
      setisPhoneEmptyErrorVisible(false);
      setisEmailEmptyErrorVisible(false);
      setisMsgEmptyErrorVisible(false);
      setIsEmailIncorrect(false);
      setIsPhoneIncorrect(false);

      const data = {
        name: name,
        phone: phone,
        email: email,
        contact: contact,
        msg: msg
      };

      const response = await HTTPRequest('POST', '/email', data);
      if (response.success) {
        setIsMsgSent(true);
      } else {
        setIsMsgSendigError(true);
      }
    }
  };

  return (
    <div className='container'>
      <section className={styles.contacFormContainer}>
        <header className={styles.header}>
          <h2 className={styles.title}>
            PRZEKONAJ SIĘ JAK MOŻEMY CI POMÓC <br /> SKONTAKTUJ SIĘ Z NAMI
          </h2>
        </header>
        <div className={styles.content}>
          <div className={styles.contactInfoTiles}>
            <div className={styles.contactTile}>
              <PhoneIcon />
              <div className={styles.contactInfo}>
                <h3 className={styles.text}>ZADZWOŃ</h3>
                <h3 className={styles.contact}>+48 600 500 620</h3>
              </div>
            </div>
            <div className={styles.contactTile}>
              <MailIcon />
              <div className={styles.contactInfo}>
                <h3 className={styles.text}>NAPISZ</h3>
                <h3 className={styles.contact}>biuro@krasinskiego29.pl</h3>
              </div>
            </div>
            <div className={styles.contactTile}>
              <MapPinIcon />
              <div className={styles.contactInfo}>
                <h3 className={styles.text}>NASZ ADRES</h3>
                <h3 className={styles.contact}>
                  Biuro Rachunkowe COMTAX <br /> ul. Krasińskiego 29 <br />
                  40-019 Katowice
                </h3>
              </div>
            </div>
            <div className={styles.contactTile}>
              <FacebookIcon />
              <div className={styles.contactInfo}>
                <h3 className={styles.contact}>ODWIEDŹ NASZEGO FACEBOOKA</h3>
              </div>
            </div>
          </div>
          <div className={styles.formContact}>
            <h3 className={styles.formTitle}>
              Wypełnij formularz a to MY <br /> skontaktujemy się z TOBĄ
            </h3>
            <form className={styles.form}>
              <Input
                label=''
                placeholder='Imię i Nazwisko'
                typeOfInput='INPUT'
                className={styles.contactInput}
                onChange={(e: any) => {
                  setName(e.target.value);
                }}
              />
              {isNameEmptyErrorVisible && (
                <p className={styles.error}>Proszę podać imię i nazwisko.</p>
              )}
              <Input
                label=''
                placeholder='Numer telefonu'
                typeOfInput='INPUT'
                className={styles.contactInput}
                onChange={(e: any) => {
                  setPhone(e.target.value);
                }}
              />
              {isPhoneEmptyErrorVisible && (
                <p className={styles.error}>Proszę podać numer telefonu.</p>
              )}
              {isPhoeIncorrect && (
                <p className={styles.error}>
                  Proszę podać poprawny numer telefonu.
                </p>
              )}
              <Input
                label=''
                placeholder='Adres e-mail'
                typeOfInput='INPUT'
                className={styles.contactInput}
                onChange={(e: any) => {
                  setEmail(e.target.value);
                }}
              />
              {isEmailEmptyErrorVisible && (
                <p className={styles.error}>Proszę podać adres e-mail.</p>
              )}
              {isEmailIncorrect && (
                <p className={styles.error}>
                  Proszę podać poprawny adres e-mail.
                </p>
              )}
              <Input
                label=''
                typeOfInput='SELECT'
                options={['telefon', 'e-mail']}
                className={styles.contactInput}
                ref={contactRef}
                onChange={(e: any) => {
                  setContact(e.target.value);
                }}
              />
              <Input
                label=''
                placeholder='Wiadomość'
                typeOfInput='TEXTAREA'
                className={styles.contactInput}
                onChange={(e: any) => {
                  setMsg(e.target.value);
                }}
              />
              {isMsgEmptyErrorVisible && (
                <p className={styles.error}>
                  Proszę napisać niepustą wiadomość.
                </p>
              )}
            </form>
            <div className={styles.submitBtnContainer}>
              {!isMsgSent && (
                <Button
                  text='Wyślij'
                  onClick={() => sendEmail()}
                  type='FULL'
                  color='GREEN'
                  btnWidth={200}
                  className={styles.submitBtn}
                />
              )}
              {isMsgSent && (
                <p className={styles.sendSuccess}>Wiadomość została wysłana.</p>
              )}
              {isMsgSendigError && (
                <p className={styles.sendError}>
                  Nie udało się wysłać wiadomości. Spróbuj ponownie za pięć
                  minut.
                </p>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ContactForm;
