import classNames from 'classnames';
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';
import Button from '../../../src/components/Button/Button';
import styles from './LoginPage.module.scss';
import * as Yup from 'yup';
import Link from 'next/link';

const FormValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Proszę podać poprawny adres e-mail.')
    .required('Proszę podać adres e-mail.'),
  password: Yup.string().required('Proszę podać hasło.')
});

interface ILoginFormValues {
  email: string;
  password: string;
}

const LoginPage = () => {
  const handleLogin = async () => {
    return;
  };

  return (
    <div className={styles.landingPage}>
      <div className={styles.loginContainer}>
        <h1>Zaloguj się, aby kontynuować</h1>
        <div className={styles.login}>
          <Formik
            initialValues={{
              email: '',
              password: ''
            }}
            validationSchema={FormValidationSchema}
            onSubmit={async (
              values: ILoginFormValues,
              { setSubmitting }: FormikHelpers<ILoginFormValues>
            ) => {
              console.log('first');
              alert(JSON.stringify(values, null, 2));

              // const data = JSON.parse(JSON.stringify(values, null, 2));
              // data.conferenceRoom = conferenceRoom.id;
              // data.date = date.getTime();

              // const response = await HTTPRequest('POST', '/reservation-email', {
              //   ...data,
              //   room: conferenceRoom
              // });
              // if (response.success) {
              //   setIsMsgSent(true);
              //   await HTTPRequest('PUT', '/reservations', data);
              // } else {
              //   setIsMsgSendigError(true);
              // }
              setSubmitting(false);
            }}
          >
            {({ errors }) => (
              <Form>
                <div className={styles.container}>
                  <div className={styles.loginInputContainer}>
                    <Field
                      id='email'
                      name='email'
                      placeholder={'E-mail'}
                      className={styles.input}
                    />
                  </div>
                  <p className={classNames(styles.error, 'p-smaller')}>
                    <ErrorMessage name='email' />
                  </p>

                  <div className={styles.loginInputContainer}>
                    <Field
                      id='password'
                      name='password'
                      type='password'
                      placeholder={'Hasło'}
                      className={styles.input}
                    />
                  </div>
                  <p className={classNames(styles.error, 'p-smaller')}>
                    <ErrorMessage name='password' />
                  </p>

                  <Button
                    onClick={handleLogin}
                    text='Zaloguj się'
                    type='FULL'
                    color='GREEN'
                    btnWidth={250}
                    btnType='submit'
                  />
                </div>
                <div className={styles.forgottenPassword}>
                  <Link href='/admin-panel/zapomniane-haslo'>
                    <a className='p-smaller'>Zapomniałem/am hasła</a>
                  </Link>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
