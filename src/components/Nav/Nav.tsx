import styles from './Nav.module.scss';
import logo from './logo.png';
import Collapsible from 'react-collapsible';
import ArrowIcon from '../Icons/arrowIcon';
import AdminPanelIcon from '../Icons/AdminPanelIcon';
import FacebookIcon from '../Icons/FacebookIcon';

function Nav() {
  return (
    <nav className={styles.nav}>
      <img className={styles.logo} src={logo.src} alt='logo' />
      <div className={styles.navItemsContainer}>
        <div className={styles.navItems}>
          <Collapsible
            className='instructors'
            trigger={
              <div className={styles.navItem}>
                <span className={styles.iconMargin}>Nasza Oferta</span>
                <ArrowIcon />
              </div>
            }
          >
            <div className={styles.offer}>
              <p>Księgowość</p>
              <p>Wirtualne Biuro</p>
              <p>Sala Konferencyjna</p>
            </div>
          </Collapsible>
          <div className={styles.navItem}>O Firmie</div>
          <div className={styles.navItem}>Kontakt</div>
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
