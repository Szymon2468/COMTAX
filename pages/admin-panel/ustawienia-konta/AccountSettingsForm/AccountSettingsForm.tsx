import styles from '../AccountSettings.module.scss';
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';
import { useEffect, useState } from 'react';
import { IUser, authorize } from '../../../../src/lib/authorize';

import MessagePopup, {
  IMessagePopup
} from '../../../../src/components/MessagePopup/MessagePopup';
import { HTTPRequest } from '../../../../src/lib/httpRequest';

interface IChangePassword {
  currentPassword: string;
  newPassword: string;
  newPasswordRep: string;
}

const AccountSettingsForm = () => {
  const [user, setUser] = useState<IUser | null>(null);
  const [messagePopUp, setMessagePopUp] = useState<IMessagePopup>({
    visible: false
  });

  useEffect(() => {
    const userAuthorize = async () => {
      setUser(await authorize());
    };
    userAuthorize();
  }, []);

  if (user === null || !user) {
    return null;
  } else if (user?.role !== 'admin') {
    window.location.href = '/admin-panel/autoryzacja/logowanie';
    return null;
  }

  const initialValues = {
    currentPassword: '',
    newPassword: '',
    newPasswordRep: ''
  };

  return (
    <>
      <MessagePopup {...messagePopUp} />

      <div className={styles.userForm}>
        <h4></h4>
        <div className={styles.form}>
          <Formik
            validate={(values) => {
              let error:
                | {
                    currentPassword?: string;
                    newPassword?: string;
                    newPasswordRep?: string;
                  }
                | undefined;
              if (values.newPassword !== values.newPasswordRep) {
                error = {
                  newPasswordRep: 'Podane hasła muszą być takie same.'
                };
              }
              if (values.newPassword.length < 6) {
                error = {
                  newPassword:
                    'Podane hasło musi zawierać przynajmniej 6 znaków.'
                };
              }
              return error;
            }}
            enableReinitialize={true}
            initialValues={initialValues}
            onSubmit={async (
              values: IChangePassword,
              { setSubmitting }: FormikHelpers<IChangePassword>
            ) => {
              setSubmitting(false);
              const response = await HTTPRequest(
                'PUT',
                `/auth/updatepassword/${user._id}`,
                {
                  currentPassword: values.currentPassword,
                  newPassword: values.newPassword
                }
              );
              if (response.success) {
                (values.currentPassword = ''),
                  (values.newPassword = ''),
                  (values.newPasswordRep = '');
                setMessagePopUp({
                  visible: true,
                  type: 'SUCCESS',
                  message: 'Pomyślnie zapisano zmiany.'
                });
              }
            }}
          >
            {({ errors }) => (
              <Form>
                <div className={styles.forms}>
                  <div className={styles.formContainer}>
                    <h5>Dane użytkownika</h5>
                    <div className={styles.formInputs}>
                      <div className={styles.formInput}>
                        <div>
                          <label htmlFor='currentPassword'>
                            Aktualne hasło
                          </label>
                          <Field
                            id='currentPassword'
                            name='currentPassword'
                            type='password'
                            placeholder={'Aktualne hasło'}
                          />
                        </div>
                        <ErrorMessage name='currentPassword' />
                      </div>

                      <div className={styles.formInput}>
                        <div>
                          <label htmlFor='newPassword'>Nowe hasło</label>
                          <Field
                            id='newPassword'
                            name='newPassword'
                            type='password'
                            placeholder={'Nowe hasło'}
                          />
                        </div>
                        <ErrorMessage name='newPassword' />
                      </div>

                      <div className={styles.formInput}>
                        <div>
                          <label htmlFor='newPasswordRep'>
                            Powtórz nowe hasło
                          </label>
                          <Field
                            id='newPasswordRep'
                            name='newPasswordRep'
                            type='password'
                            placeholder={'Powtórz nowe hasło'}
                          />
                        </div>
                        <ErrorMessage name='newPasswordRep' />
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.submitButtonContainer}>
                  <button type='submit' className={styles.submitButton}>
                    Zapisz
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default AccountSettingsForm;
