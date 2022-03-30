import styles from './ContactForm.module.scss';
import FacebookIcon from '../../assets/contactform/icons/FacebookIcon';
import MailIcon from '../../assets/contactform/icons/MailIcon';
import MapPinIcon from '../../assets/contactform/icons/MapPinIcon';
import PhoneIcon from '../../assets/contactform/icons/PhoneIcon';
import Input from '../Input/Input';
import Button from '../Button/Button';

function ContactForm() {
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
            <form>
              <Input
                label=''
                placeholder='Imię i Nazwisko'
                typeOfInput='INPUT'
              />
              <Input
                label=''
                placeholder='Numer telefonu'
                typeOfInput='INPUT'
              />
              <Input label='' placeholder='Adres e-mail' typeOfInput='INPUT' />
              <Input
                label=''
                placeholder='Adres e-mail'
                typeOfInput='SELECT'
                options={['opcja 1', 'opcja 2', 'opcja 3']}
              />
              <Input
                label=''
                placeholder='Adres e-mail'
                typeOfInput='TEXTAREA'
              />
            </form>
            <div className={styles.submitBtnContainer}>
              <Button
                text='Wyślij'
                onClick={() => {}}
                type='FULL'
                color='GREEN'
                btnWidth={200}
                className={styles.submitBtn}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ContactForm;
