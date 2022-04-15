import styles from './HamburgerMenu.module.scss';
import { Sling as Hamburger } from 'hamburger-react';
import { useEffect, useState } from 'react';
import ArrowIcon from '../Icons/ArrowIcon';
import Collapsible from 'react-collapsible';
import Link from 'next/link';
import FacebookIcon from '../Icons/FacebookIcon';

interface IHamburgerMenuProps {
  logoClicked: Boolean;
}

function HamburgerMenu({ logoClicked }: IHamburgerMenuProps) {
  const [isHamburgerMenuOpen, setIsHamburgerMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isHamburgerMenuOpen ? 'hidden' : 'inherit';
  }, [isHamburgerMenuOpen]);

  useEffect(() => {
    setIsHamburgerMenuOpen(false);
  }, [logoClicked]);

  const onNavClick = () => {
    setIsHamburgerMenuOpen(false);
  };

  return (
    <>
      <div className={styles.hamburgerMenuIcon}>
        <Hamburger
          toggled={isHamburgerMenuOpen}
          toggle={setIsHamburgerMenuOpen}
        />
      </div>

      {isHamburgerMenuOpen && (
        <div className={styles.hamburgerMenu}>
          <Collapsible
            trigger={
              <div className={styles.navItem}>
                <a href='' className={styles.iconMargin}>
                  Nasza Oferta
                </a>
                <ArrowIcon />
              </div>
            }
          >
            <div className={styles.navItem} onClick={onNavClick}>
              <Link href={'/ksiegowosc'}>Księgowość</Link>
            </div>

            <div className={styles.navItem} onClick={onNavClick}>
              <Link href={'/wirtualne-biuro'}>Wirtualne Biuro</Link>
            </div>

            <div className={styles.navItem} onClick={onNavClick}>
              <Link href={'/sale-konferencyjne'}>Sale Konferencyjne</Link>
            </div>
          </Collapsible>
          <div className={styles.navItem} onClick={onNavClick}>
            <Link href='/o-firmie-COMTAX'>O Firmie</Link>
          </div>
          <div className={styles.navItem} onClick={onNavClick}>
            <Link href='/kontakt'>Kontakt</Link>
          </div>
          <div className={styles.navIcons} onClick={onNavClick}>
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
      )}
    </>
  );
}

export default HamburgerMenu;
