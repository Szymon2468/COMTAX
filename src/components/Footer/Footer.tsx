import styles from './Footer.module.scss';
import ArrowIcon from '../Icons/arrowIcon';
import AdminPanelIcon from '../Icons/AdminPanelIcon';
import FacebookIcon from '../Icons/FacebookIcon';

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
                  <p className={styles.sideMapItem}>Księgowość</p>
                  <p className={styles.sideMapItem}>Wirtualne Biuro</p>
                  <p className={styles.sideMapItem}>Sala Konferencyjna</p>
                </div>
              </div>

              <div className={styles.navItem}>O Firmie</div>
              <div className={styles.navItem}>Kontakt</div>
            </div>
            <div className={styles.footerIcons}>
              <div className={styles.navItem} style={{ opacity: 0.5 }}>
                <span className={styles.iconMargin}>Panel Klienta</span>
                <AdminPanelIcon />
              </div>

              <div className={styles.navItem}>
                <FacebookIcon />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.belt}></div>
      <div className={styles.footerInfoContainer}>
        <p className={styles.priv}>Polityka Prywatności</p>
        <p className={styles.footerInfoItem}>
          © Copyright 2022, Biuro Rachunkowe COMTAX. All Rights Reserved.
        </p>
        <p className={styles.footerInfoItem}>
          Strona stworzona przez <span> Gancle Studio</span> | This site was
          created by <span>Gancle Studio</span> .
        </p>
      </div>
    </footer>
  );
}

export default Footer;
