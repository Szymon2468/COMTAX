import styles from './Nav.module.scss';
import logo from './logo.png';
import ArrowIcon from '../Icons/ArrowIcon';
import AdminPanelIcon from '../Icons/AdminPanelIcon';
import FacebookIcon from '../Icons/FacebookIcon';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Transition } from 'react-transition-group';
import useWindowSize, { WindowSize } from '../../hooks/useWindowSize';
import HamburgerMenu from '../HamburgerMenu/HamburgerMenu';

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
  const [logoClicked, setLogoClicked] = useState(false);
  const windowSize: WindowSize = useWindowSize();

  return (
    <nav className={styles.nav}>
      <Link href={'/'}>
        <img
          className={styles.logo}
          src={logo.src}
          alt='logo'
          onClick={() => {
            setLogoClicked(!logoClicked);
          }}
        />
      </Link>
      {windowSize.width >= 1024 && (
        <>
          <div className={styles.navItemsContainer}>
            <div className={styles.navItems}>
              <div
                style={{ height: '100%' }}
                onMouseEnter={() => setSubmenuExpanded(true)}
                onMouseLeave={() => setSubmenuExpanded(false)}
              >
                <div className={styles.navItem}>
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
                        <div className={styles.offerTile}>
                          <Link href={'/ksiegowosc'}>
                            <p>Księgowość</p>
                          </Link>
                        </div>

                        <div className={styles.offerTile}>
                          <Link href={'/wirtualne-biuro'}>
                            <p>Wirtualne Biuro</p>
                          </Link>
                        </div>

                        <div className={styles.offerTile}>
                          <Link href={'/sale-konferencyjne'}>
                            <p>Sale Konferencyjne</p>
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </Transition>

              <div className={styles.navItem}>
                <Link href='/o-firmie-COMTAX'>O Firmie</Link>
              </div>
              <div className={styles.navItem}>
                <Link href='/kontakt'>Kontakt</Link>
              </div>
            </div>
            <div className={styles.navIcons}>
              <div className={styles.navItem} style={{ opacity: 0.5 }}>
                <span className={styles.iconMargin}>Panel Klienta</span>
                <AdminPanelIcon />
              </div>

              <a
                className={styles.navItem}
                href='https://www.facebook.com/comtaxkatowice'
                target='_blank'
              >
                <FacebookIcon />
              </a>
            </div>
          </div>
        </>
      )}

      {windowSize.width < 1024 && (
        <div className={styles.hamburgerMenu}>
          <HamburgerMenu logoClicked={logoClicked} />
        </div>
      )}
    </nav>
  );
}

export default Nav;
