import { useEffect, useState } from 'react';
import { authorize, IUser } from '../../../../src/lib/authorize';
import Aside from '../Aside/aside';
import styles from './AdminPanelTemplate.module.scss';

interface IAdminPanelTemplate {
  children: JSX.Element;
  active: 'RESERVATIONS' | 'USERS' | 'ACCOUNT_SETTINGS';
}

const AdminPanelTemplate = ({ children, active }: IAdminPanelTemplate) => {
  const [user, setUser] = useState<IUser | null>(null);

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
    <section className={styles.adminPanel}>
      <Aside user={user} active={active} />
      <main className={styles.pageContent}>{children}</main>
    </section>
  );
};

export default AdminPanelTemplate;
