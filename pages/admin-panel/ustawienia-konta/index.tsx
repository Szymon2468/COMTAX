import AdminPanelTemplate from '../subComponents/AdminPanelTemplate/AdminPanelTemplate';
import styles from './AccountSettings.module.scss';

const AdminPanelPage = () => {
  return (
    <AdminPanelTemplate active='ACCOUNT_SETTINGS'>
      <div className={styles.siteInfo}>
        <h3>Ustawienia Twojego Konta</h3>
      </div>
    </AdminPanelTemplate>
  );
};

export default AdminPanelPage;
