import 'react-datepicker/dist/react-datepicker.css';
import AdminPanelTemplate from '../subComponents/AdminPanelTemplate/AdminPanelTemplate';
import styles from './AccountSettings.module.scss';
import AccountSettingsForm from './AccountSettingsForm/AccountSettingsForm';

const AccountSettingsPage = () => {
  return (
    <AdminPanelTemplate active={'ACCOUNT_SETTINGS'}>
      <>
        <div className={styles.siteInfo}>
          <h3>
            <span>Ustawienia</span>
            <span>konta</span>
          </h3>
        </div>
        <div className={styles.content}>
          <AccountSettingsForm />
        </div>
      </>
    </AdminPanelTemplate>
  );
};

export default AccountSettingsPage;
