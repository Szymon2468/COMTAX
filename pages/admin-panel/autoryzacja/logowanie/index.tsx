import classNames from 'classnames';
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';
import Button from '../../../../src/components/Button/Button';
import styles from './LoginPage.module.scss';
import * as Yup from 'yup';
import Link from 'next/link';
import { HTTPRequest } from '../../../../src/lib/httpRequest';
import { useState } from 'react';
import Cookies from 'universal-cookie';

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
  const [invalidCredentials, setInvalidCredentials] = useState(false);
  const [serverError, setServerError] = useState(false);

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
              const response = await HTTPRequest('POST', 'auth/login', values);

              if (response.serverError) {
                setServerError(true);
                return;
              }

              if (response.success) {
                const cookies = new Cookies();
                cookies.set('comtaxLoginToken', response.token, {
                  path: '/',
                  expires: new Date(response.expires)
                });

                window.location.href = '/admin-panel';
              } else {
                setInvalidCredentials(true);
              }
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

                  {invalidCredentials && (
                    <p className={classNames(styles.error, 'p-smaller')}>
                      Podano nieprawidłowe dane logowania.
                    </p>
                  )}

                  <Button
                    text='Zaloguj się'
                    type='FULL'
                    color='GREEN'
                    btnWidth={250}
                    btnType='submit'
                  />

                  {serverError && (
                    <div className={styles.loginInputContainer}>
                      <p className='smaller'>
                        Niestety wystąpiły problemy z serwerem. Proszę spróbować
                        za parę minut.
                      </p>
                    </div>
                  )}
                </div>
                <div className={styles.forgottenPassword}>
                  <Link href='/admin-panel/autoryzacja/zapomniane-haslo'>
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
