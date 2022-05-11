import classNames from 'classnames';
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';
import Button from '../../../../src/components/Button/Button';
import styles from './ForgotPassword.module.scss';
import * as Yup from 'yup';
import { useState } from 'react';
import { HTTPRequest } from '../../../../src/lib/httpRequest';

const FormValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Proszę podać poprawny adres e-mail.')
    .required('Proszę podać adres e-mail.')
});

interface IResetPasswordFormValues {
  email: string;
}

const ForgotPasswordPage = () => {
  const [emailSent, setEmailSent] = useState(false);
  const [invalidCredentials, setInvalidCredentials] = useState(false);
  const [serverError, setServerError] = useState(false);

  return (
    <div className={styles.landingPage}>
      <div className={styles.loginContainer}>
        <h1>Zresetuj swoje hasło</h1>
        <div className={styles.login}>
          <Formik
            initialValues={{
              email: ''
            }}
            validationSchema={FormValidationSchema}
            onSubmit={async (
              values: IResetPasswordFormValues,
              { setSubmitting }: FormikHelpers<IResetPasswordFormValues>
            ) => {
              const response = await HTTPRequest(
                'POST',
                'auth/forgotpassword',
                values
              );

              if (response.serverError) {
                setServerError(true);
                return;
              }
              if (response.success) {
                setEmailSent(true);
              }
              if (!response.success) {
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

                  {invalidCredentials && (
                    <p className={classNames(styles.error, 'p-smaller')}>
                      Nie znaleziono konta powiązanego z podanym adresem e-mail.
                    </p>
                  )}

                  {!emailSent && (
                    <>
                      {!serverError && (
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
                            Niestety wystąpiły problemy z serwerem. Proszę
                            spróbować za parę minut.
                          </p>
                        </div>
                      )}

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

                  {emailSent && (
                    <div className={styles.loginInputContainer}>
                      <p className='smaller'>
                        Wysłano Wiadomość E-mail. Proszę sprawdzić swoją
                        skrzynkę mailową (wiadomość może znajdować się w
                        spamie).
                      </p>
                    </div>
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

export default ForgotPasswordPage;
