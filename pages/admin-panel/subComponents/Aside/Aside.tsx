import { IUser } from '../../../../src/lib/authorize';
import styles from './Aside.module.scss';
import { MdManageAccounts } from 'react-icons/md';
import { CgLogOut } from 'react-icons/cg';
import { AiOutlineSchedule } from 'react-icons/ai';
import { FiUsers } from 'react-icons/fi';
import classNames from 'classnames';
import Link from 'next/link';
import { HTTPRequest } from '../../../../src/lib/httpRequest';
import Cookies from 'universal-cookie';
import GancleLogo from '../../../../src/assets/gancle/GancleLogo';

interface IAsideProps {
  user: IUser;
  active: 'RESERVATIONS' | 'USERS' | 'ACCOUNT_SETTINGS';
}

const Aside = ({ user, active }: IAsideProps) => {
  const handleLogout = async () => {
    await HTTPRequest('GET', 'auth/logout');
    const cookies = new Cookies();
    cookies.set('comtaxLoginToken', 'none', { path: '/' });
    window.location.href = '/admin-panel/autoryzacja/logowanie';
  };

  if (!user) {
    return null;
  }

  return (
    <aside className={styles.leftPanel}>
      <div className={styles.account}>
        <p className={styles.greetings}>Witaj, {user.name}!</p>
        <button
          className={classNames(active === 'ACCOUNT_SETTINGS' && styles.active)}
        >
          {active === 'ACCOUNT_SETTINGS' && (
            <div>
              <MdManageAccounts /> <p>Ustawienia konta</p>
            </div>
          )}
          {active !== 'ACCOUNT_SETTINGS' && (
            <Link href='/admin-panel/ustawienia-konta'>
              <div>
                <MdManageAccounts /> <p>Ustawienia konta</p>
              </div>
            </Link>
          )}
        </button>
        <button onClick={() => handleLogout()} className={styles.logoutBtn}>
          <div>
            <CgLogOut /> <p>Wyloguj się</p>
          </div>
        </button>
      </div>
      <div className={styles.options}>
        <button
          className={classNames(active === 'RESERVATIONS' && styles.active)}
        >
          {active === 'RESERVATIONS' && (
            <div>
              <AiOutlineSchedule /> <p>Rezerwacje</p>
            </div>
          )}
          {active !== 'RESERVATIONS' && (
            <Link href='/admin-panel'>
              <div>
                <AiOutlineSchedule /> <p>Rezerwacje</p>
              </div>
            </Link>
          )}
        </button>
        <button className={classNames(active === 'USERS' && styles.active)}>
          {active === 'USERS' && (
            <div>
              <FiUsers /> <p>Użytkownicy</p>
            </div>
          )}
          {active !== 'USERS' && (
            <Link href='/admin-panel/uzytkownicy'>
              <div>
                <FiUsers /> <p>Użytkownicy</p>
              </div>
            </Link>
          )}
        </button>
      </div>
      <div className={styles.creator}>
        <p>
          W razie problemów z działaniem strony lub panelu administracyjnego
          prosimy o kontakt:
        </p>
        <p>
          <a href='tel:(+48) 608 462 001'>+48 608 462 001</a>
        </p>
        <p className={styles.logo}>
          <a href='https://www.gancle-studio.pl'>
            <GancleLogo />
          </a>
        </p>
      </div>
    </aside>
  );
};

export default Aside;
