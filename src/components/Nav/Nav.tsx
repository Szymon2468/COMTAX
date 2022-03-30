import styles from './Nav.module.scss';
import logo from './logo.png';
import Collapsible from 'react-collapsible';
import ArrowIcon from '../Icons/ArrowIcon';
import AdminPanelIcon from '../Icons/AdminPanelIcon';
import FacebookIcon from '../Icons/FacebookIcon';
import Link from 'next/link';

function Nav() {
  return (
    <nav className={styles.nav}>
      <Link href={'/'}>
        <img className={styles.logo} src={logo.src} alt='logo' />
      </Link>
      <div className={styles.navItemsContainer}>
        <div className={styles.navItems}>
          <Collapsible
            className=''
            trigger={
              <div className={styles.navItem}>
                <span className={styles.iconMargin}>Nasza Oferta</span>
                <ArrowIcon />
              </div>
            }
          >
            <div className={styles.offer}>
              <Link href={'/ksiegowosc'}>
                <p>Księgowość</p>
              </Link>

              <Link href={'/wirtualne-biuro'}>
                <p>Wirtualne Biuro</p>
              </Link>

              <Link href={'/sale-konferencyjne'}>
                <p>Sale Konferencyjne</p>
              </Link>
            </div>
          </Collapsible>
          <div className={styles.navItem}>O Firmie</div>
          <div className={styles.navItem}>
            <Link href='/kontakt'>Kontakt</Link>
          </div>
        </div>
        <div className={styles.navIcons}>
          <div className={styles.navItem} style={{ opacity: 0.5 }}>
            <span className={styles.iconMargin}>Panel Klienta</span>
            <AdminPanelIcon />
          </div>

          <div className={styles.navItem}>
            <FacebookIcon />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
