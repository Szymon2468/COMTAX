import styles from './HamburgerMenuButton.module.scss';

function HamburgerMenuButton() {
  return (
    <div className={styles.hamburgerMenuButton}>
      <div className={styles.menuButton}>
        <input type='checkbox' className={styles.menuCheckbox} />
        <label htmlFor='menu_checkbox' className={styles.menuLabel}>
          <div className={styles.menuTextBar}></div>
        </label>
      </div>
    </div>
  );
}

export default HamburgerMenuButton;
