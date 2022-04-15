import Button from '../../src/components/Button/Button';
import styles from './LoginPage.module.scss';

const LoginPage = () => {
  const handleLogin = async () => {
    // e.preventDefault();
    // const login = document.getElementById('login');
    // const password = document.getElementById('password');
    // const data = {
    //   login: login.value || '',
    //   password: password.value || ''
    // };
    // const status = await httpRequest('POST', '/auth/login', data);
    // if (status.data.success) {
    //   document.cookie = `oyamaKarateEuToken=${status.data.token}`;
    //   redirect('/admin/glowna');
    // }
    return;
  };

  return (
    <div className={styles.landingPage}>
      <div className={styles.loginContainer}>
        <h1>Zaloguj się, aby kontynuować</h1>
        <form className={styles.login}>
          <div className={styles.container}>
            <div className={styles.loginInputContainer}>
              <label htmlFor='login'>Login</label>
              <input
                id='login'
                type='text'
                name='login'
                placeholder='Podaj swój login'
              />
            </div>

            <div className={styles.loginInputContainer}>
              <label htmlFor='password'>Hasło</label>
              <input
                id='password'
                type='password'
                name='password'
                placeholder='Podaj swoje hasło'
              />
            </div>

            <Button
              onClick={handleLogin}
              text='Zaloguj się'
              type='FULL'
              color='GREEN'
              btnWidth={250}
            ></Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
