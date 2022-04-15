import styles from './Footer.module.scss';
import AdminPanelIcon from '../Icons/AdminPanelIcon';
import FacebookIcon from '../Icons/FacebookIcon';
import Link from 'next/link';

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerItemsContainer}>
        <div className={styles.address}>
          <p className={styles.greenColor}>Biuro Rachunkowe COMTAX</p>
          <p className={styles.addressItem}>ul. Krasińskiego 29</p>
          <p className={styles.addressItem}>40-019 Katowice</p>
          <p className={styles.addressItem}>tel. +48 600 500 620</p>
          <p className={styles.addressItem}>biuro@krasinskiego29.pl</p>
          <p className={styles.addressItem}>NIP: 6341204764</p>
          <p className={styles.addressItem}>REGON: 277676100</p>
        </div>

        <div className={styles.sideMap}>
          <div className={styles.navItemsContainer}>
            <div className={styles.footerIcons}>
              <div className={styles.navItem}>
                <div className={styles.offer}>
                  <span
                    className={`${styles.bottomMargin} ${styles.sideMapItem} ${styles.iconMargin}`}
                  >
                    Nasza Oferta
                  </span>
                  <p className={styles.sideMapItem}>
                    <Link href='/ksiegowosc'>Księgowość</Link>
                  </p>
                  <p className={styles.sideMapItem}>
                    <Link href='/wirtualne-biuro'>Wirtualne Biuro</Link>
                  </p>
                  <p className={styles.sideMapItem}>
                    <Link href='/sale-konferencyjne'>Sale Konferencyjne</Link>
                  </p>
                </div>
              </div>

              <div className={styles.navItem}>
                <Link href='/o-firmie-COMTAX'>O Firmie</Link>
              </div>
              <div className={styles.navItem}>
                <Link href='/kontakt'>Kontakt</Link>
              </div>
            </div>
            <div className={styles.footerIcons}>
              <div className={styles.navItem} style={{ opacity: 0.5 }}>
                <span className={styles.iconMargin}>Panel Klienta</span>
                <AdminPanelIcon />
              </div>

              <div className={styles.navItem}>
                <a
                  className={styles.navItem}
                  href='https://www.facebook.com/comtaxkatowice'
                  target='_blank'
                  rel='noreferrer'
                >
                  <FacebookIcon />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.belt}></div>
      <div className={styles.footerInfoContainer}>
        <p className={styles.priv}>
          <Link href='polityka-prywatnosci'>Polityka Prywatności</Link>
        </p>
        <p className={styles.footerInfoItem}>
          © Copyright 2022, Biuro Rachunkowe COMTAX. All Rights Reserved.
        </p>

        <a href='https://gancle-studio.pl'>
          <p className={styles.footerInfoItemCreator}>
            Strona stworzona przez <span> Gancle Studio</span> | This site was
            created by <span>Gancle Studio</span> .
          </p>
        </a>
      </div>
    </footer>
  );
}

export default Footer;
