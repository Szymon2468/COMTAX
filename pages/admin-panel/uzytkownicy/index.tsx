import AdminPanelTemplate from '../subComponents/AdminPanelTemplate/AdminPanelTemplate';
import styles from './Users.module.scss';

const AdminPanelPage = () => {
  return (
    <AdminPanelTemplate active={'USERS'}>
      <div className={styles.siteInfo}>
        <h3>Zarządzaj Użytkownikami</h3>
      </div>
    </AdminPanelTemplate>
  );
};

export default AdminPanelPage;
