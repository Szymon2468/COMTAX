import styles from './Nav.module.scss';
import logo from './logo.png';
import ArrowIcon from '../Icons/ArrowIcon';
import AdminPanelIcon from '../Icons/AdminPanelIcon';
import FacebookIcon from '../Icons/FacebookIcon';
import Link from 'next/link';
import { useState } from 'react';
import { Transition } from 'react-transition-group';

const duration = 200;

const defaultStyle = {
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0,
  zIndex: 999
};

const transitionStyles = {
  entering: { opacity: 1, zIndex: 999 },
  entered: { opacity: 1, zIndex: 999 },
  exiting: { opacity: 0, zIndex: 999 },
  exited: { opacity: 0, zIndex: 999 }
};

function Nav() {
  const [submenuExpanded, setSubmenuExpanded] = useState(false);

  return (
    <nav className={styles.nav}>
      <Link href={'/'}>
        <img className={styles.logo} src={logo.src} alt='logo' />
      </Link>
      <div className={styles.navItemsContainer}>
        <div className={styles.navItems}>
          <div
            style={{ height: '100%' }}
            onMouseEnter={() => setSubmenuExpanded(true)}
            onMouseLeave={() => setSubmenuExpanded(false)}
          >
            <div
              className={styles.navItem}
              onClick={() => setSubmenuExpanded(!submenuExpanded)}
            >
              <span className={styles.iconMargin}>Nasza Oferta</span>
              <ArrowIcon />
            </div>
          </div>
          <Transition
            in={submenuExpanded}
            timeout={duration}
            mountOnEnter
            onMountOnExit
          >
            {(state: string | number) => (
              <div
                style={{
                  ...defaultStyle,
                  ...transitionStyles[state]
                }}
              >
                {submenuExpanded && (
                  <div
                    className={styles.offer}
                    onMouseEnter={() => setSubmenuExpanded(true)}
                    onMouseLeave={() => setSubmenuExpanded(false)}
                  >
                    <Link href={'/ksiegowosc'}>
                      <div className={styles.offerTile}>
                        <p>Księgowość</p>
                      </div>
                    </Link>

                    <Link href={'/wirtualne-biuro'}>
                      <div className={styles.offerTile}>
                        <p>Wirtualne Biuro</p>
                      </div>
                    </Link>

                    <Link href={'/sale-konferencyjne'}>
                      <div className={styles.offerTile}>
                        <p>Sale Konferencyjne</p>
                      </div>
                    </Link>
                  </div>
                )}
              </div>
            )}
          </Transition>

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
