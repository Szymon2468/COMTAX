import { useEffect, useState } from 'react';
import useWindowSize from '../../../../src/hooks/useWindowSize';
import { authorize, IUser } from '../../../../src/lib/authorize';
import Aside from '../Aside/Aside';
import styles from './AdminPanelTemplate.module.scss';
import { Sling as Hamburger } from 'hamburger-react';
import classNames from 'classnames';

interface IAdminPanelTemplate {
  children: JSX.Element;
  active: 'RESERVATIONS' | 'USERS' | 'ACCOUNT_SETTINGS' | 'CONFERENCE_ROOMS';
}

const AdminPanelTemplate = ({ children, active }: IAdminPanelTemplate) => {
  const windowSize = useWindowSize();
  const [user, setUser] = useState<IUser | null>(null);
  const [isAsideOpen, setIsAsideOpen] = useState(true);

  useEffect(() => {
    document.body.style.overflow =
      isAsideOpen && windowSize.width <= 768 ? 'hidden' : 'inherit';
  }, [isAsideOpen]);

  useEffect(() => {
    setIsAsideOpen(windowSize.width > 768);
  }, [windowSize]);

  useEffect(() => {
    const userAuthorize = async () => {
      setUser(await authorize());
    };
    userAuthorize();
  }, []);

  if (user === null || !user) {
    return null;
  } else if (user?.role !== 'admin') {
    window.location.href = '/admin-panel/autoryzacja/logowanie';
    return null;
  }

  return (
    <>
      <section className={styles.adminPanel}>
        {isAsideOpen && (
          <Aside user={user} active={active} isOpen={isAsideOpen} />
        )}
        {windowSize.width <= 768 && (
          <div
            className={classNames(
              styles.hamburgerMenuIcon,
              isAsideOpen && styles.hamburgerMenuOpen
            )}
          >
            <Hamburger
              toggled={isAsideOpen}
              toggle={setIsAsideOpen}
              size={18}
            />
          </div>
        )}
        <main className={styles.pageContent}>{children}</main>
      </section>
    </>
  );
};

export default AdminPanelTemplate;
