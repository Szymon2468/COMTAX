import classNames from 'classnames';
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';
import Button from '../../../../src/components/Button/Button';
import styles from './PasswordReset.module.scss';
import dbConnect from '../../../../app/lib/dbConnect';
import { HTTPRequest } from '../../../../src/lib/httpRequest';
import { useState } from 'react';

const User = require('../../../../app/models/User');

interface IResetPasswordFormValues {
  password: string;
  passwordRep: string;
}

interface IPasswordResetPageProps {
  id: string;
}

const PasswordResetPage = ({ id }: IPasswordResetPageProps) => {
  const [passwordChanged, setPasswordChanged] = useState(false);
  const [invalidToken, setInvalidToken] = useState(false);
  const [serverError, setServerError] = useState(false);

  return (
    <div className={styles.landingPage}>
      <div className={styles.loginContainer}>
        <h1>Zresetuj swoje hasło</h1>
        <div className={styles.login}>
          <Formik
            initialValues={{
              password: '',
              passwordRep: ''
            }}
            validate={(values) => {
              let error:
                | {
                    password?: string;
                    passwordRep?: string;
                  }
                | undefined;
              if (values.password !== values.passwordRep) {
                error = { passwordRep: 'Podane hasła muszą być takie same.' };
              }
              if (values.password.length < 6) {
                error = {
                  password: 'Podane hasło musi zawierać przynajmniej 6 znaków.'
                };
              }
              return error;
            }}
            onSubmit={async (
              values: IResetPasswordFormValues,
              { setSubmitting }: FormikHelpers<IResetPasswordFormValues>
            ) => {
              const data = {
                password: values.password
              };

              const response = await HTTPRequest(
                'PUT',
                `auth/resetpassword/${id}`,
                data
              );

              if (response.serverError) {
                setServerError(true);
                return;
              }

              if (response.success) {
                setPasswordChanged(true);
              } else {
                setInvalidToken(true);
              }
              setSubmitting(false);
            }}
          >
            {({ errors }) => (
              <Form>
                <div className={styles.container}>
                  <div className={styles.loginInputContainer}>
                    <Field
                      id='password'
                      name='password'
                      type='password'
                      placeholder={'Nowe hasło'}
                      className={styles.input}
                    />
                  </div>
                  <p className={classNames(styles.error, 'p-smaller')}>
                    <ErrorMessage name='password' />
                  </p>

                  <div className={styles.loginInputContainer}>
                    <Field
                      id='passwordRep'
                      name='passwordRep'
                      type='password'
                      placeholder={'Powtórz hasło'}
                      className={styles.input}
                    />
                  </div>
                  <p className={classNames(styles.error, 'p-smaller')}>
                    <ErrorMessage name='passwordRep' />
                  </p>

                  {!invalidToken && !passwordChanged && !serverError && (
                    <Button
                      text='Zresetuj hasło'
                      type='FULL'
                      color='GREEN'
                      btnWidth={250}
                      btnType='submit'
                    />
                  )}

                  {serverError && (
                    <div className={styles.loginInputContainer}>
                      <p className='smaller'>
                        Niestety wystąpiły problemy z serwerem. Proszę spróbować
                        za parę minut.
                      </p>
                    </div>
                  )}

                  {invalidToken && (
                    <>
                      <div className={styles.loginInputContainer}>
                        <p className='smaller'>
                          Niestety Twój token wygasł. Spóbuj ponownie przejść
                          procedurę zapomnianego hasła.
                        </p>
                      </div>

                      <Button
                        text='Strona logowania'
                        type='FULL'
                        color='BLUE'
                        btnWidth={250}
                        className={styles.backBtn}
                        onClick={() =>
                          (window.location.href =
                            '/admin-panel/autoryzacja/logowanie')
                        }
                      />
                    </>
                  )}

                  {passwordChanged && (
                    <>
                      <div className={styles.loginInputContainer}>
                        <p className='smaller'>
                          Udało się pomyślnie zmienić hasło.
                        </p>
                      </div>
                      <Button
                        text='Strona logowania'
                        type='FULL'
                        color='BLUE'
                        btnWidth={250}
                        className={styles.backBtn}
                        onClick={() =>
                          (window.location.href =
                            'admin-panel/autoryzacja/logowanie')
                        }
                      />
                    </>
                  )}
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

interface IParams {
  params: { token: string };
}

interface IUser {
  resetPasswordToken: string;
}

export async function getStaticPaths() {
  await dbConnect();
  const data = await User.find({});

  const params: IParams[] = [];
  data.forEach((el: IUser) => {
    if (el.resetPasswordToken) {
      params.push({
        params: {
          token: el.resetPasswordToken
        }
      });
    }
  });

  return {
    paths: params,
    fallback: true // false or 'blocking'
  };
}

export async function getStaticProps({ params: { token } }: IParams) {
  return {
    props: {
      id: token
    },
    revalidate: 3600
  };
}

export default PasswordResetPage;
